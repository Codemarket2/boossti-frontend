import { FieldUniqueLoading } from './FieldUnique';

interface IUniqueMultipleValue {
  loading: boolean;
  error: any;
  field: any;
}

export default function UniqueMultipleValue({ loading, error, field }: IUniqueMultipleValue) {
  if (loading) {
    return <FieldUniqueLoading />;
  }

  if (error?.includes(field?._id)) {
    return (
      <span className="text-danger">
        {' '}
        can&apos;t have duplicate values, each value must be unique
      </span>
    );
  }
  return null;
}
