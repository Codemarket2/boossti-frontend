/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { useAddFields } from '@frontend/shared/hooks/form';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import TypesAutocomplete from './TypesAutocomplete';

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
        <FormControl disabled={formik.isSubmitting} component="fieldset">
          <FormLabel component="legend">Field Type</FormLabel>
          <RadioGroup
            aria-label="fieldType"
            name="fieldType"
            value={formik.values.fieldType}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="text" control={<Radio color="primary" />} label="Text" />
            <FormControlLabel value="number" control={<Radio color="primary" />} label="Number" />
            <FormControlLabel
              value="textarea"
              control={<Radio color="primary" />}
              label="Textarea"
            />
            <FormControlLabel
              value="boolean"
              control={<Radio color="primary" />}
              label="Boolean (Yes/No)"
            />
            <FormControlLabel value="email" control={<Radio color="primary" />} label="Email" />
            <FormControlLabel
              value="phoneNumber"
              control={<Radio color="primary" />}
              label="Phone Number"
            />
            <FormControlLabel value="url" control={<Radio color="primary" />} label="URL" />
            <FormControlLabel value="date" control={<Radio color="primary" />} label="Date" />
            <FormControlLabel
              value="media"
              control={<Radio color="primary" />}
              label="Media (Images/Video)"
            />
            <FormControlLabel
              value="type"
              control={<Radio color="primary" />}
              label="Exisiting Type"
            />
            <FormControlLabel value="address" control={<Radio color="primary" />} label="Address" />
          </RadioGroup>
          {formik.touched.fieldType && formik.errors.fieldType && (
            <FormHelperText className="text-danger">{formik.errors.fieldType}</FormHelperText>
          )}
        </FormControl>
      </InputGroup>
      {formik.values.fieldType === 'type' && <TypesAutocomplete formik={formik} />}
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
