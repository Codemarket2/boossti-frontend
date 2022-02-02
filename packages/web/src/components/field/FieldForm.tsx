/* eslint-disable react/jsx-wrap-multilines */
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
import { useCRUDFields, useGetField } from '@frontend/shared/hooks/field';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import SelectListType from '../form2/SelectListType';
import ErrorLoading from '../common/ErrorLoading';

export const fieldTypes = [
  { label: 'Form1', value: 'form' },
  { label: 'Form2', value: 'form2' },
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Password', value: 'password' },
  { label: 'Rich Textarea', value: 'textarea' },
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
  edit?: boolean;
}

function UpdateFieldInput({ formik }: any) {
  const { data, error } = useGetField(formik.values.relationId);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (data?.getField?.label && !init) {
      setInit(true);
      formik.setFieldValue('relationLabel', data?.getField?.label, false);
    }
  }, [data]);

  if (error) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getField) {
    return <Skeleton variant="rect" height={50} />;
  }

  return (
    <InputGroup>
      <TextField
        fullWidth
        label="Field Label"
        variant="outlined"
        name="relationLabel"
        size="small"
        disabled={formik.isSubmitting}
        value={formik.values.relationLabel}
        onChange={formik.handleChange}
        error={formik.touched.relationLabel && Boolean(formik.errors.relationLabel)}
        helperText={formik.touched.relationLabel && formik.errors.relationLabel}
      />
    </InputGroup>
  );
}

export default function FieldForm({ onCancel, parentId, field = null, edit = false }: IProps): any {
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
        <>
          <InputGroup>
            <SelectListType
              disabled={formik.isSubmitting}
              value={formik.values.typeId}
              onChange={(newValue) => {
                formik.setFieldValue('typeId', newValue);
              }}
              error={formik.touched.typeId && Boolean(formik.errors.typeId)}
              helperText={formik.touched.typeId && formik.errors.typeId}
              filterId={parentId}
            />
          </InputGroup>
          {edit && formik.values.relationId ? (
            <UpdateFieldInput formik={formik} />
          ) : (
            <InputGroup>
              <TextField
                fullWidth
                label="Field Label"
                variant="outlined"
                name="relationLabel"
                size="small"
                disabled={formik.isSubmitting}
                value={formik.values.relationLabel}
                onChange={formik.handleChange}
                error={formik.touched.relationLabel && Boolean(formik.errors.relationLabel)}
                helperText={formik.touched.relationLabel && formik.errors.relationLabel}
              />
            </InputGroup>
          )}
        </>
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
              checked={formik.values.allowOthers}
              onChange={({ target }) => formik.setFieldValue('allowOthers', target.checked)}
              name="allowOthers"
              color="primary"
            />
          }
          label="Allow other users to add value"
        />
      </InputGroup>

      <InputGroup>
        <LoadingButton type="submit" data-testid="save-button" loading={formLoading} size="small">
          Save
        </LoadingButton>
        <Button
          className="ml-2"
          data-testid="cancel-button"
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
