import { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import { getUserAttributes } from '@frontend/shared/hooks/user/getUserForm';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import DisplayValue from '../form2/DisplayValue';
import Authorization from '../common/Authorization';
import DeleteButton from '../common/DeleteButton';
import { ResponseChild3 } from './Response';
import EditResponseDrawer from './EditResponseDrawer';
import { DataTable } from './Table';
import { useSelector } from 'react-redux';
import ReactDataGrid from './ReactDataGrid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { Search } from '@mui/icons-material';

interface IProps {
  form: any;
  workFlowFormResponseParentId?: string;
  showOnlyMyResponses?: boolean;
  templateId?: string;
  templateDefaultWidgetResponseId?: string;
  isTemplateInstance?: string;
  valueFilter?: any;
}
type Direction = 'ltr' | 'rtl';

export default function ResponseList({
  form,
  workFlowFormResponseParentId,
  showOnlyMyResponses,
  templateId,
  isTemplateInstance,
  templateDefaultWidgetResponseId,
  valueFilter,
}: IProps): any {
  const { data, error, loading, state, setState, refetch, handleUpdateResponse } = useGetResponses({
    formId: form?._id,
    onlyMy: showOnlyMyResponses,
    workFlowFormResponseParentId,
    templateId,
    templateDefaultWidgetResponseId,
    valueFilter,
  });
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const router = useRouter();
  const [selectedResponse, setSelectedResponse] = useState(null);
  // const [direction, setDirection] = useState<Direction>('ltr');
  // const [selectedRows, setSelectedRows] = useState<ReadonlySet<string>>(() => new Set());

  const userForm = useSelector(({ setting }: any) => setting.userForm);

  // function handleFill({ columnKey, sourceRow, targetRow }) {
  //   return { ...targetRow, [columnKey]: sourceRow[columnKey] };
  // }

  // function handlePaste({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }) {
  //   const incompatibleColumns = ['email', 'zipCode', 'date'];
  //   if (
  //     sourceColumnKey === 'avatar' ||
  //     ['id', 'avatar'].includes(targetColumnKey) ||
  //     ((incompatibleColumns.includes(targetColumnKey) ||
  //       incompatibleColumns.includes(sourceColumnKey)) &&
  //       sourceColumnKey !== targetColumnKey)
  //   ) {
  //     return targetRow;
  //   }

  //   return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] };
  // }

  // function handleCopy({ sourceRow, sourceColumnKey }) {
  //   if (window.isSecureContext) {
  //     navigator.clipboard.writeText(sourceRow[sourceColumnKey]);
  //   }
  // }

  // function rowKeyGetter(row) {
  //   return row.id;
  // }

  return (
    <>
      <Backdrop open={deleteLoading} />
      {form?.settings?.responsesView === 'table2' ? (
        <>
          <ReactDataGrid
            form={form}
            responses={data?.getResponses?.data}
            onRowChange={handleUpdateResponse}
          />
          {/* <DataTable
            data={data}
            form={form}
            refetch={refetch}
            rowHeight={40}
            rowKeyGetter={rowKeyGetter}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            onFill={handleFill}
            onCopy={handleCopy}
            onPaste={handlePaste}
            direction={direction}
          /> */}
        </>
      ) : form?.settings?.responsesView === 'vertical' ? (
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
          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 25, 50]}
            count={data?.getResponses?.count || 0}
            rowsPerPage={state.limit}
            page={state.page - 1}
            onPageChange={(e, newPage) => setState({ ...state, page: newPage + 1 })}
            onRowsPerPageChange={(e) => setState({ ...state, limit: parseInt(e.target.value) })}
          />
        </>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <div className="d-flex justify-content-between align-items-center">
            <TextField
              className="ml-2"
              size="small"
              variant="outlined"
              label="Search"
              InputProps={{
                endAdornment:
                  state.search && loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <Search />
                  ),
              }}
              value={state.search}
              onChange={({ target: { value } }) => setState({ ...state, search: value })}
            />
            <TablePagination
              component="div"
              rowsPerPageOptions={[10, 25, 50]}
              count={data?.getResponses?.count || 0}
              rowsPerPage={state.limit}
              page={state.page - 1}
              onPageChange={(e, newPage) => setState({ ...state, page: newPage + 1 })}
              onRowsPerPageChange={(e) => setState({ ...state, limit: parseInt(e.target.value) })}
            />
          </div>
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
                            <IconButton
                              onClick={() => setSelectedResponse(response)}
                              edge="start"
                              size="large"
                            >
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
                        {/* {form?.name?.toLowerCase() === 'account' && (
                          <a
                            href={`https://${
                              getFieldValueByLabel('name', form?.fields, response?.values)?.value
                            }.boossti.com/admin`}
                            target="_blank"
                          >
                            <IconButton edge="start" size="large">
                              <LaunchIcon />
                            </IconButton>
                          </a>
                        )} */}
                        <Tooltip title="Open Response">
                          <IconButton
                            onClick={() => {
                              let route = '';
                              if (isTemplateInstance) {
                                route = `/${isTemplateInstance}/${response.count}`;
                              } else {
                                route = `/forms/${form.slug}/response/${response.count}`;
                              }
                              router.push(route);
                            }}
                            edge="start"
                            size="large"
                          >
                            <LaunchIcon />
                          </IconButton>
                        </Tooltip>
                        <ListItemText
                          className="m-0 p-0"
                          primary={`${
                            getUserAttributes(userForm, response?.createdBy)?.firstName
                          } ${getUserAttributes(userForm, response?.createdBy)?.lastName}`}
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
    </>
  );
}

// const getFieldValueByLabel = (label: string, fields: any[], values: any[] = []) => {
//   let value;
//   const field = fields.find((f) => f?.label?.toLowerCase() === label?.toLowerCase());
//   if (field) {
//     value = values.find((v) => v?.field === field?._id);
//   }
//   return value;
// };
