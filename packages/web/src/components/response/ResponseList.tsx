import { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@material-ui/core/ListItemText';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import EditIcon from '@material-ui/icons/Edit';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import DisplayValue from '../form2/DisplayValue';
import Authorization from '../common/Authorization';
import DeleteButton from '../common/DeleteButton';
import { ResponseChild3 } from './Response';
import EditResponseDrawer from './EditResponseDrawer';
import Overlay from '../common/Overlay';
import { useEffect } from 'react';
import DataGrid, { CopyEvent, PasteEvent, SelectColumn, TextEditor } from 'react-data-grid';

interface IProps {
  form: any;
  parentId?: string;
  workFlowFormReponseParentId?: string;
  layouts?: any;
  showOnlyMyResponses?: boolean;
}
type Direction = 'ltr' | 'rtl';

export default function ResponseList({
  form,
  parentId,
  workFlowFormReponseParentId,
  showOnlyMyResponses,
}: IProps): any {
  const { data, error, state, setState, refetch } = useGetResponses(
    form._id,
    parentId,
    null,
    showOnlyMyResponses,
    workFlowFormReponseParentId,
  );
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const router = useRouter();
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [rows, setRows] = useState([]);
  const [colm, setColm] = useState([]);
  const [direction, setDirection] = useState<Direction>('ltr');
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<string>>(() => new Set());
  /*
    const columns: GridColDef[] = [
      { field: 'col1', headerName: 'Column 1', width: 150 },
      { field: 'col2', headerName: 'Column 2', width: 150 },
    ];   
   */
  function handleFill({ columnKey, sourceRow, targetRow }) {
    return { ...targetRow, [columnKey]: sourceRow[columnKey] };
  }

  function handlePaste({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }) {
    const incompatibleColumns = ['email', 'zipCode', 'date'];
    if (
      sourceColumnKey === 'avatar' ||
      ['id', 'avatar'].includes(targetColumnKey) ||
      ((incompatibleColumns.includes(targetColumnKey) ||
        incompatibleColumns.includes(sourceColumnKey)) &&
        sourceColumnKey !== targetColumnKey)
    ) {
      return targetRow;
    }

    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] };
  }

  function handleCopy({ sourceRow, sourceColumnKey }) {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(sourceRow[sourceColumnKey]);
    }
  }

  function rowKeyGetter(row) {
    return row.id;
  }

  const createColm = (form) => {
    const arr = [
      SelectColumn,
      { key: 'sno', name: 'S.No', resizable: true, frozen: true, width: 60 },
    ];

    form?.fields?.map((e) => {
      const temp = {
        key: '',
        name: '',
        resizable: true,
        frozen: false,
        editor: TextEditor,
      };
      temp.key = e._id;
      temp.name = e.label;
      arr.push(temp);
    });
    return arr;
  };

  const createRows = (data) => {
    const arr = [];
    data?.getResponses?.data?.map((e, i) => {
      const temp = { sno: i, id: i };
      e?.values?.map((v) => {
        temp[v.field] = v.value;
      });
      arr.push(temp);
    });
    return arr;
  };

  useEffect(() => {
    setColm(createColm(form));
  }, [form]);
  useEffect(() => {
    setRows(createRows(data));
  }, [form, data]);
  return (
    <>
      <Backdrop open={deleteLoading} />
      {form?.settings?.responsesView != 'vertical' && form?.settings?.responsesView == 'table' && (
        <div style={{ height: 720, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={colm}
            rowHeight={40}
            onRowsChange={setRows}
            rowKeyGetter={rowKeyGetter}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            onFill={handleFill}
            onCopy={handleCopy}
            onPaste={handlePaste}
            className="fill-grid"
            direction={direction}
          />
        </div>
      )}
      {form?.settings?.responsesView != 'vertical' && form?.settings?.responsesView != 'table' && (
        <TableContainer component={Paper} variant="outlined">
          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 25, 50]}
            count={data?.getResponses?.count || 0}
            rowsPerPage={state.limit}
            page={state.page - 1}
            onChangePage={(e, newPage) => setState({ ...state, page: newPage + 1 })}
            onChangeRowsPerPage={(e) => setState({ ...state, limit: parseInt(e.target.value) })}
          />
          {error || !data || !data.getResponses ? (
            <Paper variant="outlined" className="p-5">
              <ErrorLoading error={error} />
            </Paper>
          ) : (
            <Table
              aria-label="response table"
              size="small"
              style={{ overflow: 'scroll', width: '100%' }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  {form?.fields?.map((field, i) => (
                    <TableCell key={i}>{field.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.getResponses?.data?.map((response) => (
                  <TableRow key={response._id}>
                    <TableCell>
                      <div className="d-flex">
                        <Authorization _id={[response?.createdBy?._id]} allowAdmin returnNull>
                          <DeleteButton
                            onClick={async () => {
                              await handleDelete(response._id, refetch);
                            }}
                            edge="start"
                          />
                          <Tooltip title="Open Response">
                            <IconButton onClick={() => setSelectedResponse(response)} edge="start">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          {selectedResponse?._id === response?._id && (
                            <>
                              <EditResponseDrawer
                                open
                                form={form}
                                response={selectedResponse}
                                onClose={() => setSelectedResponse(null)}
                              />
                            </>
                          )}
                        </Authorization>
                        <Tooltip title="Open Response">
                          <IconButton
                            onClick={() => {
                              router.push(`/forms/${form.slug}/response/${response.count}`);
                            }}
                            edge="start"
                          >
                            <LaunchIcon />
                          </IconButton>
                        </Tooltip>
                        <ListItemText
                          className="m-0 p-0"
                          primary={response?.createdBy?.name}
                          secondary={`${moment(response.createdAt).format('l')} ${moment(
                            response.createdAt,
                          ).format('LT')}`}
                        />
                      </div>
                    </TableCell>
                    {form?.fields?.map((field, i) => (
                      <TableCell key={i}>
                        {response?.values
                          ?.filter((v) => v.field === field._id)
                          ?.map((value) => (
                            <div key={value?._id}>
                              <DisplayValue field={field} value={value} />
                            </div>
                          ))}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
      {form?.settings?.responsesView === 'vertical' && (
        <>
          {data?.getResponses?.data?.map((response) => (
            <ResponseChild3
              key={response?._id}
              hideBreadcrumbs
              form={form}
              response={response}
              deleteCallBack={() => refetch()}
            />
          ))}
        </>
      )}
    </>
  );
}
