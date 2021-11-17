import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import moment from 'moment';

interface IProps {
  form: any;
}

const getValue = (field, values) => {
  const value = values.filter((v) => v.field === field._id)[0];
  if (!value) {
    return null;
  }
  switch (field.fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'select':
    case 'email':
    case 'password':
      return value.value;
    case 'date':
    case 'dateTime':
      return value.valueDate;
    case 'number':
    case 'phoneNumber':
      return value.valueNumber;
    case 'checkbox':
      return value.valueBoolean;
    default:
      return null;
  }
};

export default function ResponseList({ form }: IProps): any {
  const { data, error, loading, state, setState } = useGetResponses(form._id);
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });

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
                    <IconButton onClick={() => handleDelete(response._id, form._id)} edge="start">
                      <Delete />
                    </IconButton>
                    {`${moment(response.createdAt).format('l')} ${moment(response.createdAt).format(
                      'LT',
                    )}`}
                  </TableCell>
                  {form?.fields?.map((field, i) => (
                    <TableCell key={i}>{getValue(field, response?.values)}</TableCell>
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
