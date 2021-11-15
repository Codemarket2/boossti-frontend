import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useGetResponses } from '@frontend/shared/hooks/response';
import ErrorLoading from '../common/ErrorLoading';

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
  if (error || !data || !data.getResponses) {
    return (
      <Paper variant="outlined" className="p-5">
        <ErrorLoading error={error} />
      </Paper>
    );
  }
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="response table" size="small">
        <TableHead>
          <TableRow>
            {form?.fields?.map((field, i) => (
              <TableCell key={i}>{field.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.getResponses?.data?.map((response) => (
            <TableRow key={response._id}>
              {form?.fields?.map((field, i) => (
                <TableCell key={i}>{getValue(field, response?.values)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
