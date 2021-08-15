import { useGetFieldsByType } from '@frontend/shared/hooks/field';
import FieldsSkeleton from './FieldsSkeleton';
import ErrorLoading from '../common/ErrorLoading';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddCircle from '@material-ui/icons/AddCircle';
import ItemFieldForm from './ItemFieldsForm';
import { useState } from 'react';

const initialState = {
  showForm: false,
  showMenu: null,
  selectedFieldValue: null,
  edit: false,
};

function ItemOneFields({ field }) {
  const [state, setState] = useState(initialState);

  return (
    <>
      <Divider className="mt-5" />
      <div key={field._id} className="mt-2">
        <Typography variant="h5">{field.label}</Typography>
        {state.showForm ? (
          <ItemFieldForm
            label={`${field.label} Value`}
            onCancel={() => setState(initialState)}
            parentId={'parentId'}
          />
        ) : (
          <Button
            className="mt-2"
            size="small"
            variant="outlined"
            component="span"
            color="primary"
            startIcon={<AddCircle />}
            onClick={() => setState({ ...initialState, showForm: true })}>
            Add Value
          </Button>
        )}
      </div>
    </>
  );
}

export default function ItemsFieldsMap({ parentId }) {
  const [state, setState] = useState(initialState);
  const { data, loading, error } = useGetFieldsByType({ parentId });

  if (loading || (!error && (!data || !data.getFieldsByType))) {
    return <FieldsSkeleton />;
  } else if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {data.getFieldsByType.data.map((field) => (
        <ItemOneFields field={field} key={field._id} />
      ))}
    </>
  );
}
