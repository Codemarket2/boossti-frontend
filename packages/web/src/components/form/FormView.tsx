import { useGetFieldsByType } from '@frontend/shared/hooks/field';
import Button from '@material-ui/core/Button';
import ErrorLoading from '../common/ErrorLoading';
import InputGroup from '../common/InputGroup';
import FormField from './FormField';

interface IProps {
  parentId: string;
}

export default function FormView({ parentId }: IProps): any {
  const { data, error } = useGetFieldsByType({ parentId });

  if (error || !data || !data.getFieldsByType) {
    return <ErrorLoading error={error} />;
  }

  return (
    <div>
      {data?.getFieldsByType?.data.map((field) => (
        <InputGroup key={field._id}>
          <FormField {...field} />
        </InputGroup>
      ))}
      {data?.getFieldsByType?.count > 0 && (
        <Button variant="contained" color="primary" size="small">
          Submit
        </Button>
      )}
    </div>
  );
}
