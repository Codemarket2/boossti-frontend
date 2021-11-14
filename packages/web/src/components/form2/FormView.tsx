import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputGroup from '../common/InputGroup';
import Field from './Field';

interface IProps {
  fields: any;
}

export default function FormView({ fields }: IProps): any {
  return (
    <Paper variant="outlined" className="px-2">
      {fields.map((field) => (
        <InputGroup key={field._id}>
          <Field {...field} />
        </InputGroup>
      ))}
      {fields.length > 0 && (
        <InputGroup>
          <Button variant="contained" color="primary" size="small">
            Submit
          </Button>
        </InputGroup>
      )}
    </Paper>
  );
}
