import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useCRUDFieldValue } from '@frontend/shared/hooks/field';
import { useGetListItemsByType } from '@frontend/shared/hooks/list';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import { useEffect } from 'react';

interface IProps {
  onCancel: () => void;
  parentId: any;
  field: any;
  fieldValue?: any;
  label: string;
  fieldType: string;
  typeId: string;
}

export default function ItemFieldForm({
  onCancel,
  parentId = null,
  field = null,
  fieldValue = null,
  fieldType,
  label = 'Value',
  typeId,
}: IProps) {
  const { data, error, loading, state, setState } = useGetListItemsByType({
    limit: 10,
    types: [typeId],
  });

  const { formik, formLoading, setFormValues } = useCRUDFieldValue({
    onAlert,
    parentId,
    field,
    createCallback: onCancel,
    fieldType,
  });

  useEffect(() => {
    if (fieldValue) {
      setFormValues(fieldValue);
    }
  }, [fieldValue]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {formik.values.fieldType === 'string' ? (
          <InputGroup>
            <TextField
              fullWidth
              label={label}
              variant="outlined"
              name="value"
              size="small"
              disabled={formik.isSubmitting}
              value={formik.values.value}
              onChange={formik.handleChange}
              error={formik.touched.value && Boolean(formik.errors.value)}
              helperText={formik.touched.value && formik.errors.value}
            />
          </InputGroup>
        ) : (
          <InputGroup>
            {error ? (
              <p>Error - {error.message}</p>
            ) : (
              <Autocomplete
                disabled={formik.isSubmitting}
                value={formik.values.itemId}
                onChange={(event: any, newValue) => {
                  formik.setFieldValue('itemId', newValue);
                }}
                getOptionLabel={(option) => option.title}
                inputValue={state.search}
                onInputChange={(event, newInputValue) => {
                  setState({ ...state, search: newInputValue });
                }}
                options={data && data.getListItems ? data.getListItems.data : []}
                renderInput={(params) => (
                  <TextField
                    error={formik.touched.itemId && Boolean(formik.errors.itemId)}
                    helperText={formik.touched.itemId && formik.errors.itemId}
                    fullWidth
                    {...params}
                    label={`Select Value`}
                    variant="outlined"
                  />
                )}
              />
            )}
          </InputGroup>
        )}
        <InputGroup>
          <LoadingButton type="submit" loading={formLoading} size="small">
            Save
          </LoadingButton>
          <Button
            className="ml-2"
            disabled={formLoading}
            variant="outlined"
            size="small"
            onClick={onCancel}>
            Cancel
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}
