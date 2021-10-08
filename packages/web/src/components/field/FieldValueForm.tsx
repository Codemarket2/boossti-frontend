import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import AddressSearch from '../common/AddressSearch';
// import BuilderDialog from '../contentbuilder/BuilderDialog';

import dynamic from 'next/dynamic';

const RichTextarea = dynamic(() => import('../common/RichTextarea'), { ssr: false });
const BuilderDialog = dynamic(() => import('../contentbuilder/BuilderDialog'), { ssr: false });

interface IProps {
  onCancel: () => void;
  parentId: any;
  field: any;
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
  fieldValue = null,
  fieldType,
  label = 'Value',
  typeId,
  typeSlug,
  edit = false,
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

  if (edit && formik.values._id === '') {
    return <p>Loading</p>;
  }

  return (
    <div>
      {formik.values.fieldType === 'contentBuilder' ? (
        <BuilderDialog
          onClose={onCancel}
          value={formik.values.value}
          onSave={(newValue) => {
            formik.setFieldValue('value', newValue);
            formik.handleSubmit();
          }}
          loading={formLoading}
        />
      ) : (
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
                    loading={loading}
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
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                  <ItemFormDrawer
                    open={drawer.showDrawer}
                    onClose={() => setDrawer({ showDrawer: false })}
                    typeTitle={label}
                    typeSlug={typeSlug}
                    typeId={typeId}
                    onSelect={(newValue) => {
                      formik.setFieldValue('itemId', newValue);
                      setDrawer({ showDrawer: false });
                    }}
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
            ) : (
              <TextField
                fullWidth
                label={label}
                variant="outlined"
                name="value"
                size="small"
                type={formik.values.fieldType === 'number' ? 'number' : 'text'}
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
      )}
    </div>
  );
}
