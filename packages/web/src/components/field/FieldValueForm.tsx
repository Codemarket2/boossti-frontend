import { useEffect } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useCRUDFieldValue } from '@frontend/shared/hooks/field';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import ImagePicker from '../common/ImagePicker';
import { onAlert } from '../../utils/alert';
import AddressSearch from '../common/AddressSearch';
import RichTextarea from '../common/RichTextarea2';
import SelectListItem from '../form2/SelectListItem';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  onCancel: () => void;
  parentId: any;
  field: any;
  relationId: string;
  fieldValue?: any;
  label: string;
  fieldType: string;
  typeId: string;
  typeSlug: string;
  edit?: boolean;
}

export default function ItemFieldForm({
  onCancel,
  parentId = null,
  field = null,
  relationId = null,
  fieldValue = null,
  fieldType,
  label = 'Value',
  typeId,
  typeSlug,
  edit = false,
}: IProps) {
  const { formik, formLoading, setFormValues, mediaState, setMediaState } = useCRUDFieldValue({
    onAlert,
    parentId,
    field,
    relationId,
    createCallback: onCancel,
    fieldType,
  });

  useEffect(() => {
    if (fieldValue) {
      setFormValues(fieldValue);
    }
  }, [fieldValue]);

  if (edit && formik.values._id === '') {
    return <ErrorLoading />;
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <InputGroup>
          {formik.values.fieldType === 'date' ? (
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
              <KeyboardDatePicker
                name="valueDate"
                placeholder={moment().format('L')}
                value={formik.values.valueDate ? moment(formik.values.valueDate) : null}
                onChange={(value) => formik.setFieldValue('valueDate', moment(value))}
                error={formik.touched.valueDate && Boolean(formik.errors.valueDate)}
                helperText={formik.touched.valueDate && formik.errors.valueDate}
                format="MM/DD/YYYY"
              />
            </MuiPickersUtilsProvider>
          ) : formik.values.fieldType === 'type' ? (
            <SelectListItem
              typeSlug={typeSlug}
              typeId={typeId}
              label={label}
              error={formik.touched.itemId && Boolean(formik.errors.itemId)}
              helperText={formik.touched.itemId && formik.errors.itemId}
              value={formik.values.itemId}
              onChange={(newValue) => {
                formik.setFieldValue('itemId', newValue);
              }}
              allowCreate
            />
          ) : formik.values.fieldType === 'boolean' ? (
            <FormControl disabled={formik.isSubmitting} component="fieldset">
              <FormLabel component="legend">Select {label}</FormLabel>
              <RadioGroup
                aria-label="valueBoolean"
                name="valueBoolean"
                value={formik.values.valueBoolean}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />
                <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
              </RadioGroup>
              {formik.touched.valueBoolean && formik.errors.valueBoolean && (
                <FormHelperText className="text-danger">
                  {formik.errors.valueBoolean}
                </FormHelperText>
              )}
            </FormControl>
          ) : formik.values.fieldType === 'media' ? (
            <div>
              <FormLabel component="legend">Select {label}</FormLabel>
              <ImagePicker state={mediaState} setState={setMediaState} />
              {formik.touched.media && formik.errors.media && (
                <FormHelperText className="text-danger">{formik.errors.media}</FormHelperText>
              )}
            </div>
          ) : formik.values.fieldType === 'address' ? (
            <AddressSearch
              label={label}
              value={formik.values.value}
              onChange={(value) => formik.setFieldValue('value', value)}
            />
          ) : formik.values.fieldType === 'textarea' ? (
            <RichTextarea
              value={formik.values.value}
              onChange={(value) => formik.setFieldValue('value', value)}
            />
          ) : formik.values.fieldType === 'number' ? (
            <TextField
              fullWidth
              label={label}
              variant="outlined"
              name="valueNumber"
              type="number"
              size="small"
              disabled={formik.isSubmitting}
              value={formik.values.valueNumber}
              onChange={formik.handleChange}
              error={formik.touched.valueNumber && Boolean(formik.errors.valueNumber)}
              helperText={formik.touched.valueNumber && formik.errors.valueNumber}
            />
          ) : (
            <TextField
              fullWidth
              label={label}
              variant="outlined"
              name="value"
              size="small"
              type="text"
              disabled={formik.isSubmitting}
              value={formik.values.value}
              onChange={formik.handleChange}
              error={formik.touched.value && Boolean(formik.errors.value)}
              helperText={formik.touched.value && formik.errors.value}
            />
          )}
        </InputGroup>
        <InputGroup>
          <LoadingButton type="submit" loading={formLoading} data-testid="save-button" size="small">
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
    </div>
  );
}
