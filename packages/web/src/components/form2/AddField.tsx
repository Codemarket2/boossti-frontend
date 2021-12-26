/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useAddFields } from '@frontend/shared/hooks/form';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import TypesAutocomplete from './TypesAutocomplete';

export const fieldTypes = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Password', value: 'password' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Rich Textarea', value: 'richTextarea' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Select', value: 'select' },
  { label: 'Email', value: 'email' },
  { label: 'Phone Number', value: 'phoneNumber' },
  { label: 'Date', value: 'date' },
  { label: 'Date & Time', value: 'dateTime' },
  { label: 'Image', value: 'image' },
  // { label: 'Media (Images/Video)', value: 'media' },
  // { label: 'Address', value: 'address' },
  { label: 'Existing Type', value: 'type' },
];

interface IProps {
  onCancel: () => void;
  onSave: (field: any, action: string) => void;
  field: any;
}

export default function FieldForm({ onCancel, onSave, field = null }: IProps): any {
  const { formik, formLoading, setFormValues } = useAddFields({
    onAlert,
    onSave,
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
          error={formik.touched.fieldType && formik.errors.fieldType}
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
              <MenuItem value={option.value} key={index}>
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
        <TypesAutocomplete
          disabled={formik.isSubmitting}
          value={formik.values.typeId}
          onChange={(newValue) => formik.setFieldValue('typeId', newValue)}
          error={formik.touched.typeId && Boolean(formik.errors.typeId)}
          helperText={formik.touched.typeId && formik.errors.typeId}
        />
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
          label="Mutiple values"
        />
      </InputGroup>
      <InputGroup>
        <FormControlLabel
          disabled={formik.isSubmitting}
          control={
            <Checkbox
              checked={formik.values.required}
              onChange={({ target }) => formik.setFieldValue('required', target.checked)}
              name="required"
              color="primary"
            />
          }
          label="Required"
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
          onClick={onCancel}
        >
          Cancel
        </Button>
      </InputGroup>
    </form>
  );
}
