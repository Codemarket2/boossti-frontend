/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from 'react';
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
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import SelectListType from '../form2/SelectListType';

export const fieldTypes = [
  { label: 'Form', value: 'form' },
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

function UpdateFieldInput({ formik }) {
  // const { data: data2, error: error2 } = useGetFieldByRelationId(formik.values._id);
  // if (!error2 && (!data2 || !data2.getFieldByRelationId)) {
  //   return <FieldsSkeleton />;
  // }
  // if (error2) {
  //   return <ErrorLoading error={error2} />;
  // }

  // useEffect(() => {
  //   if (data2?.getFieldByRelationId?.Label) {
  //     formik.setFieldValue('fieldLabel', data2?.getFieldByRelationId?.label, false);
  //   }
  // }, [data2]);

  return (
    <InputGroup>
      <TextField
        fullWidth
        label="Field Label"
        variant="outlined"
        name="fieldLabel"
        size="small"
        disabled={formik.isSubmitting}
        value={
          // formik.values.relationId
          //   ? data2.getFieldByRelationId.label
          //   : data2.getFieldByRelationId.fieldLabel
          formik.values.fieldLabel
        }
        onChange={formik.handleChange}
        error={formik.touched.fieldLabel && Boolean(formik.errors.fieldLabel)}
        helperText={formik.touched.fieldLabel && formik.errors.fieldLabel}
      />
    </InputGroup>
  );
}

export default function FieldForm({
  onCancel,
  parentId,
  field = null,
  edit = false,
  formBuilder = false,
}: IProps): any {
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
            />
          </InputGroup>
          {edit ? (
            <UpdateFieldInput formik={formik} />
          ) : (
            <InputGroup>
              <TextField
                fullWidth
                label="Field Label"
                variant="outlined"
                name="fieldLabel"
                size="small"
                disabled={formik.isSubmitting}
                value={formik.values.fieldLabel}
                onChange={formik.handleChange}
                error={formik.touched.fieldLabel && Boolean(formik.errors.fieldLabel)}
                helperText={formik.touched.fieldLabel && formik.errors.fieldLabel}
              />
            </InputGroup>
          )}
        </>
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
