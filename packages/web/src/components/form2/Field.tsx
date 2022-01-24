import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker, DatePicker } from '@material-ui/pickers';
import PhoneInput from 'react-phone-input-2';
import ImagePicker from '../common/ImagePicker';
import RichTextarea from '../common/RichTextarea2';
import DisplayRichText from '../common/DisplayRichText';
// import AddressSearch from '../common/AddressSearch';
import SelectListItem from './SelectListItem';
import { validateValue } from './validate';
import SelectResponse from './SelectResponse';
import Select from './Select';

import 'react-phone-input-2/lib/style.css';

interface IProps {
  disabled?: boolean;
  validate: boolean;
  _id: string;
  label: string;
  fieldType: string;
  typeId: any;
  options: any;
  value: any;
  onChangeValue: (arg: any) => void;
  mediaState: any;
  setMediaState: any;
  form: any;
}

export default function FieldValueForm2({
  disabled = false,
  validate,
  _id,
  label,
  fieldType,
  typeId,
  options,
  value,
  onChangeValue,
  form,
}: IProps): any {
  const onChange = (payload) => {
    onChangeValue({ ...value, ...payload });
  };
  switch (fieldType) {
    case 'label': {
      return <DisplayRichText value={options?.staticText} />;
    }
    case 'date': {
      return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <DatePicker
            disabled={disabled}
            fullWidth
            size="small"
            inputVariant="outlined"
            placeholder={moment().format('L')}
            format="MM/DD/YYYY"
            // label={label}
            value={value && value?.valueDate ? moment(value.valueDate) : null}
            onChange={(newValue) => onChange({ field: _id, valueDate: moment(newValue) })}
            animateYearScrolling
            error={validateValue(validate, value, options, fieldType).error}
            helperText={validateValue(validate, value, options, fieldType).errorMessage}
          />
        </MuiPickersUtilsProvider>
      );
    }
    case 'dateTime': {
      return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <DateTimePicker
            disabled={disabled}
            fullWidth
            size="small"
            inputVariant="outlined"
            placeholder={moment().format('L')}
            format="lll"
            // label={label}
            value={value && value?.valueDate ? moment(value.valueDate) : null}
            onChange={(newValue) => onChange({ field: _id, valueDate: moment(newValue) })}
            animateYearScrolling
            error={validateValue(validate, value, options, fieldType).error}
            helperText={validateValue(validate, value, options, fieldType).errorMessage}
          />
        </MuiPickersUtilsProvider>
      );
    }
    case 'richTextarea': {
      return (
        <>
          {/* <InputLabel>{label}</InputLabel> */}
          <RichTextarea
            value={value ? value.value : ''}
            onChange={(newValue) => onChange({ field: _id, value: newValue })}
          />
          {validateValue(validate, value, options, fieldType).error && (
            <FormHelperText className="text-danger">
              {validateValue(validate, value, options, fieldType).errorMessage}
            </FormHelperText>
          )}
        </>
      );
    }
    // case 'address': {
    //   return (
    //     <AddressSearch
    //       label={label}
    //       value={value}
    //       onChange={(newValue) => onChange({ field: _id, value: newValue })}
    //     />
    //   );
    // }
    case 'checkbox': {
      return (
        <>
          <FormControlLabel
            disabled={disabled}
            control={
              <Checkbox
                checked={value ? value.valueBoolean : false}
                onChange={({ target }) => onChange({ field: _id, valueBoolean: target.checked })}
                name="valueBoolean"
                color="primary"
              />
            }
            label={label}
          />
          {validateValue(validate, value, options, fieldType).error && (
            <FormHelperText className="text-danger">
              {validateValue(validate, value, options, fieldType).errorMessage}
            </FormHelperText>
          )}
        </>
      );
    }
    case 'image': {
      return (
        <div>
          {/* <InputLabel component="legend">{label}</InputLabel> */}
          <ImagePicker
            label="Select Image"
            fileType="image/*"
            mutiple={options?.multipleValues}
            state={value || { tempMedia: [], tempMediaFiles: [] }}
            setState={(newValue) => onChange({ field: _id, ...newValue })}
          />
          {validateValue(validate, value, options, fieldType).error && (
            <FormHelperText className="text-danger">
              {validateValue(validate, value, options, fieldType).errorMessage}
            </FormHelperText>
          )}
        </div>
      );
    }
    // case 'media': {
    //   return (
    //     <div>
    //       <FormLabel component="legend">Select {label}</FormLabel>
    //       <ImagePicker state={mediaState} setState={setMediaState} />
    //       {validateValue(validate, value, options, fieldType).error && (
    //         <FormHelperText className="text-danger">
    //           {validateValue(validate, value, options, fieldType).errorMessage}
    //         </FormHelperText>
    //       )}
    //     </div>
    //   );
    // }
    case 'select': {
      return (
        <>
          {options?.optionsListType === 'type' ? (
            <SelectListItem
              typeSlug={typeId?.slug || null}
              typeId={typeId?._id || null}
              label={label}
              error={validateValue(validate, value, options, fieldType).error}
              helperText={validateValue(validate, value, options, fieldType).errorMessage}
              value={value ? value.itemId : null}
              onChange={(newValue) => onChange({ field: _id, itemId: newValue })}
              allowCreate={options?.selectAllowCreate}
            />
          ) : options?.optionsListType === 'existingForm' ? (
            <SelectResponse
              label={label}
              formId={form?._id}
              formField={options?.formField}
              value={value?.response}
              onChange={(newValue) => onChange({ field: _id, response: newValue })}
              error={validateValue(validate, value, options, fieldType).error}
              helperText={validateValue(validate, value, options, fieldType).errorMessage}
            />
          ) : options?.showAsCheckbox ? (
            <div>
              {options?.selectOptions?.map((option) => (
                <FormControlLabel control={<Checkbox name={option} />} label={option} />
              ))}
            </div>
          ) : (
            <Select
              label={label}
              options={options?.selectOptions}
              value={value ? value?.value : ''}
              onChange={(newValue) => onChange({ field: _id, value: newValue })}
              selectAllowCreate={options?.selectAllowCreate}
              error={validateValue(validate, value, options, fieldType).error}
              helperText={validateValue(validate, value, options, fieldType).errorMessage}
            />
          )}
        </>
      );
    }
    case 'phoneNumber': {
      return (
        <>
          <PhoneInput
            countryCodeEditable={false}
            country="us"
            preferredCountries={['us']}
            enableSearch
            value={value ? value.valueNumber : ''}
            onChange={(phone) => onChange({ field: _id, valueNumber: phone })}
            inputStyle={
              validateValue(validate, value, options, fieldType).error ? { borderColor: 'red' } : {}
            }
          />
          {validateValue(validate, value, options, fieldType).error && (
            <FormHelperText className="text-danger">
              {validateValue(validate, value, options, fieldType).errorMessage}
            </FormHelperText>
          )}
        </>
      );
    }
    case 'number': {
      return (
        <TextField
          fullWidth
          placeholder={label}
          variant="outlined"
          name="valueNumber"
          size="small"
          type="number"
          disabled={disabled}
          value={value ? value.valueNumber : ''}
          onChange={({ target }) => onChange({ field: _id, valueNumber: target.value })}
          error={validateValue(validate, value, options, fieldType).error}
          helperText={validateValue(validate, value, options, fieldType).errorMessage}
        />
      );
    }
    default: {
      return (
        <TextField
          multiline={fieldType === 'textarea'}
          rows={fieldType === 'textarea' && 6}
          fullWidth
          placeholder={label}
          variant="outlined"
          name="value"
          size="small"
          type={['email', 'password'].includes(fieldType) ? fieldType : 'text'}
          disabled={disabled}
          value={value ? value.value : ''}
          onChange={({ target }) => onChange({ field: _id, value: target.value })}
          error={
            validateValue(
              validate,
              value,
              options,
              ['email'].includes(fieldType) ? fieldType : 'text',
            ).error
          }
          helperText={
            validateValue(
              validate,
              value,
              options,
              ['email'].includes(fieldType) ? fieldType : 'text',
            ).errorMessage
          }
        />
      );
    }
  }
}
