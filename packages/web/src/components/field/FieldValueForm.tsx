import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useCRUDFieldValue } from '@frontend/shared/hooks/field';
import { useGetListItemsByType } from '@frontend/shared/hooks/list';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import ItemFormDrawer from '../list/ItemFormDrawer';
import ImagePicker from '../common/ImagePicker';
import { onAlert } from '../../utils/alert';
import { useEffect, useState } from 'react';
import moment from 'moment';

const filter = createFilterOptions();

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

  const [drawer, setDrawer] = useState({ showDrawer: false });

  const { formik, formLoading, setFormValues, mediaState, setMediaState } = useCRUDFieldValue({
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
        <InputGroup>
          {formik.values.fieldType === 'date' ? (
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
              <KeyboardDatePicker
                name="value"
                placeholder={moment().format('L')}
                value={formik.values.value ? moment(formik.values.value) : null}
                onChange={(value) => formik.setFieldValue('value', moment(value))}
                error={formik.touched.value && Boolean(formik.errors.value)}
                helperText={formik.touched.value && formik.errors.value}
                format="MM/DD/YYYY"
              />
            </MuiPickersUtilsProvider>
          ) : formik.values.fieldType === 'type' ? (
            error ? (
              <p>Error - {error.message}</p>
            ) : (
              <>
                <Autocomplete
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        title: `Add New "${params.inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
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
                <ItemFormDrawer
                  open={drawer.showDrawer}
                  onClose={() => setDrawer({ showDrawer: false })}
                  typeTitle={label}
                />
                <Button
                  className="mt-2"
                  disabled={formLoading}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setDrawer({ ...drawer, showDrawer: true })}>
                  Add Your New {label}
                </Button>
              </>
            )
          ) : formik.values.fieldType === 'boolean' ? (
            <FormControl disabled={formik.isSubmitting} component="fieldset">
              <FormLabel component="legend">Select {label}</FormLabel>
              <RadioGroup
                aria-label="value"
                name="value"
                value={formik.values.value}
                onChange={formik.handleChange}>
                <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
              </RadioGroup>
              {formik.touched.value && formik.errors.value && (
                <FormHelperText className="text-danger">{formik.errors.value}</FormHelperText>
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
          ) : (
            <TextField
              multiline={formik.values.fieldType === 'textarea'}
              rows={formik.values.fieldType === 'textarea' ? 4 : null}
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
          )}
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
