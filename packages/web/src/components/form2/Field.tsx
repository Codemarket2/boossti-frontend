import dynamic from 'next/dynamic';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker, DatePicker } from '@material-ui/pickers';
import PhoneInput from 'react-phone-input-2';
import FormLabel from '@material-ui/core/FormLabel';
import ImagePicker from '../common/ImagePicker';
// import AddressSearch from '../common/AddressSearch';
import ListAutocomplete from './ListAutocomplete';
import { validateValue } from './validate';

import 'react-phone-input-2/lib/style.css';

const RichTextarea = dynamic(() => import('../common/RichTextarea'), { ssr: false });

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
}: IProps): any {
  const onChange = (payload)=>{
    onChangeValue({...value,...payload})
  }
  switch (fieldType) {
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
            label={label}
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
            label={label}
            value={value && value?.valueDate ? moment(value.valueDate) : null}
            onChange={(newValue) => onChange({ field: _id, valueDate: moment(newValue) })}
            animateYearScrolling
            error={validateValue(validate, value, options, fieldType).error}
            helperText={validateValue(validate, value, options, fieldType).errorMessage}
          />
        </MuiPickersUtilsProvider>
      );
    }
    case 'textarea': {
      return (
        <>
          <InputLabel>{label}</InputLabel>
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
    case 'type': {
      return (
        <ListAutocomplete
          typeSlug={typeId?.slug || null}
          typeId={typeId?._id || null}
          label={label}
          vError={validateValue(validate, value, options, fieldType).error}
          helperText={validateValue(validate, value, options, fieldType).errorMessage}
          value={value ? value.itemId : null}
          onChange={(newValue) => onChange({ field: _id, itemId: newValue })}
        />
      );
    }
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
          <FormLabel component="legend">{label}</FormLabel>
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
        <FormControl
          disabled={disabled}
          variant="outlined"
          fullWidth
          size="small"
          error={validateValue(validate, value, options, 'text').error}
        >
          <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value ? value.value : ''}
            onChange={({ target }) => onChange({ field: _id, value: target.value })}
            label={label}
          >
            {options?.selectOptions?.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {validateValue(validate, value, options, fieldType).error && (
            <FormHelperText className="text-danger">
              {validateValue(validate, value, options, fieldType).errorMessage}
            </FormHelperText>
          )}
        </FormControl>
      );
    }
    case 'phoneNumber': {
      return (
        <>
          <InputLabel>{label}</InputLabel>
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
          label={label}
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
          fullWidth
          label={label}
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
