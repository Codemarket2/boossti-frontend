import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { useCRUDFields } from '@frontend/shared/hooks/field';
import { useGetListTypes } from '@frontend/shared/hooks/list';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import { useEffect } from 'react';

interface IProps {
  onCancel: () => void;
  parentId: any;
  field?: any;
}

export default function FieldForm({ onCancel, parentId, field = null }: IProps) {
  const { data, error, loading, state, setState } = useGetListTypes({ limit: 10 });

  const { formik, formLoading, setFormValues } = useCRUDFields({
    onAlert,
    parentId,
    createCallback: onCancel,
  });

  useEffect(() => {
    if (field) {
      setFormValues(field);
    }
  }, [field]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <TextField
            fullWidth
            label="Label"
            variant="outlined"
            name="label"
            size="small"
            disabled={formik.isSubmitting}
            value={formik.values.label}
            onChange={formik.handleChange}
            error={formik.touched.label && Boolean(formik.errors.label)}
            helperText={formik.touched.label && formik.errors.label}
          />
        </InputGroup>
        <InputGroup>
          <FormControl disabled={formik.isSubmitting} component="fieldset">
            <FormLabel component="legend">Field Type</FormLabel>
            <RadioGroup
              aria-label="fieldType"
              name="fieldType"
              value={formik.values.fieldType}
              onChange={formik.handleChange}>
              <FormControlLabel value="string" control={<Radio color="primary" />} label="String" />
              <FormControlLabel value="date" control={<Radio color="primary" />} label="Date" />
              <FormControlLabel
                value="type"
                control={<Radio color="primary" />}
                label="Exisiting Type"
              />
            </RadioGroup>
            {formik.touched.fieldType && formik.errors.fieldType && (
              <FormHelperText className="text-danger">{formik.errors.fieldType}</FormHelperText>
            )}
          </FormControl>
        </InputGroup>
        {formik.values.fieldType === 'type' && (
          <InputGroup>
            {error ? (
              <p>Error - {error.message}</p>
            ) : (
              <Autocomplete
                disabled={formik.isSubmitting}
                value={formik.values.typeId}
                onChange={(event: any, newValue) => {
                  formik.setFieldValue('typeId', newValue);
                }}
                getOptionLabel={(option) => option.title}
                inputValue={state.search}
                onInputChange={(event, newInputValue) => {
                  setState({ ...state, search: newInputValue });
                }}
                options={data && data.getListTypes ? data.getListTypes.data : []}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Select Type"
                    variant="outlined"
                    error={formik.touched.typeId && Boolean(formik.errors.typeId)}
                    helperText={formik.touched.typeId && formik.errors.typeId}
                  />
                )}
              />
            )}
          </InputGroup>
        )}
        <InputGroup>
          <FormControlLabel
            disabled={formik.isSubmitting}
            control={
              <Checkbox
                checked={formik.values.multipleValues}
                onChange={({ target }) => formik.setFieldValue('multipleValues', target.checked)}
                name="multipleValues"
                color="primary"
              />
            }
            label="Allow other users to add their own value"
          />
        </InputGroup>
        <InputGroup>
          <FormControlLabel
            disabled={formik.isSubmitting}
            control={
              <Checkbox
                checked={formik.values.oneUserMultipleValues}
                onChange={({ target }) =>
                  formik.setFieldValue('oneUserMultipleValues', target.checked)
                }
                name="oneUserMultipleValues"
                color="primary"
              />
            }
            label="Each user can add mutiple values"
          />
        </InputGroup>
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
