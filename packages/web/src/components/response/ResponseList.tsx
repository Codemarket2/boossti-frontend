import { useGetForm } from '@frontend/shared/hooks/form';
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
import Delete from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import DisplayValue from '../form2/DisplayValue';

interface IProps {
  form: any;
  hideDelete?: boolean;
  parentId?: string;
}

export default function ResponseList({ form, hideDelete = false, parentId }: IProps): any {
  const { data, error, state, setState } = useGetResponses(form._id, parentId);
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const router = useRouter();

  return (
    <>
      <Backdrop open={deleteLoading} />
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
                      {!hideDelete && (
                        <Tooltip title="Delete response">
                          <IconButton
                            onClick={() => {
                              const anwser = confirm(
                                'Are you sure you want to delete this response',
                              );
                              if (anwser) {
                                handleDelete(response._id, form._id);
                              }
                            }}
                            edge="start"
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
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
    </>
  );
}

export function ResponseListWrapper({ formId, parentId }: { formId: string; parentId?: string }) {
  const { data, error } = useGetForm(formId);

  if (error || !data?.getForm) {
    return <ErrorLoading error={error} />;
  }
  return <ResponseList form={data?.getForm} hideDelete parentId={parentId} />;
}
