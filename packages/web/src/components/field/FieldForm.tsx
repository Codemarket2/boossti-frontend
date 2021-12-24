/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useCRUDFields } from '@frontend/shared/hooks/field';
import { useGetListTypes } from '@frontend/shared/hooks/list';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import ErrorLoading from '../common/ErrorLoading';
import { onAlert } from '../../utils/alert';

export const fieldTypes = [
  { label: 'Form', value: 'form' },
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Password', value: 'password' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Select', value: 'select' },
  { label: 'Email', value: 'email' },
  { label: 'Phone Number', value: 'phoneNumber' },
  { label: 'Date', value: 'date' },
  { label: 'Date & Time', value: 'dateTime' },
  { label: 'Media (Images/Video)', value: 'media' },
  { label: 'Address', value: 'address' },
  { label: 'Existing Type', value: 'type' },
];

interface IProps {
  onCancel: () => void;
  parentId: string;
  field: any;
  formBuilder: boolean;
}

export default function FieldForm({
  onCancel,
  parentId,
  field = null,
  formBuilder = false,
}: IProps): any {
  const { data, error, state, setState } = useGetListTypes({ limit: 10 });

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
    <form className="px-2" onSubmit={formik.handleSubmit}>
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
        <FormControl
          variant="outlined"
          fullWidth
          size="small"
          error={Boolean(formik.touched.fieldType && formik.errors.fieldType)}
          disabled={formik.isSubmitting}
        >
          <InputLabel id="fieldType-simple-select-outlined-label">Field Type</InputLabel>
          <Select
            labelId="fieldType-simple-select-outlined-label"
            id="fieldType-simple-select-outlined"
            name="fieldType"
            value={formik.values.fieldType}
            onChange={formik.handleChange}
            label="Field Type"
          >
            {fieldTypes?.map((option, index) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.fieldType && formik.errors.fieldType && (
            <FormHelperText className="text-danger">{formik.errors.fieldType}</FormHelperText>
          )}
        </FormControl>
      </InputGroup>
      {formik.values.fieldType === 'type' && (
        <InputGroup>
          {error ? (
            <ErrorLoading error={error} />
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
      {!(formik.values.fieldType === 'form') && (
        <>
          {!formBuilder && (
            <InputGroup>
              <FormControlLabel
                disabled={formik.isSubmitting}
                control={
                  <Checkbox
                    checked={formik.values.multipleValues}
                    onChange={({ target }) =>
                      formik.setFieldValue('multipleValues', target.checked)
                    }
                    name="multipleValues"
                    color="primary"
                  />
                }
                label="Allow other users to add their own value"
              />
            </InputGroup>
          )}
        </>
      )}
      {(formik.values.multipleValues || formBuilder) && !(formik.values.fieldType === 'form') && (
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
          onClick={onCancel}
        >
          Cancel
        </Button>
      </InputGroup>
    </form>
  );
}
