import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import ImagePicker from '../common/ImagePicker';
import AddressSearch from '../common/AddressSearch';
import SelectListItem from '../form2/SelectListItem';
import RichTextarea from '../common/RichTextarea2';

interface IProps {
  label: string;
  fieldType: string;
  itemId: any;
  typeId: any;
  typeSlug: any;
  value: string;
  onChange: (arg: any) => void;
  disabled?: boolean;
  mediaState: any;
  setMediaState: any;
}

export default function FieldValueForm2({
  label,
  fieldType,
  value,
  onChange,
  disabled,
  typeSlug,
  typeId,
  mediaState,
  setMediaState,
  itemId,
}: IProps) {
  if (fieldType === 'date') {
    return (
      <>
        <InputLabel>{label}</InputLabel>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <KeyboardDatePicker
            name="value"
            placeholder={moment().format('L')}
            value={value ? moment(value) : null}
            onChange={(newValue) => onChange(moment(newValue))}
            //   error={formik.touched.value && Boolean(formik.errors.value)}
            //   helperText={formik.touched.value && formik.errors.value}
            format="MM/DD/YYYY"
          />
        </MuiPickersUtilsProvider>
      </>
    );
  } else if (fieldType === 'textarea') {
    return (
      <>
        <InputLabel>{label}</InputLabel>
        <RichTextarea value={value} onChange={(newValue) => onChange(newValue)} />
      </>
    );
  } else if (fieldType === 'address') {
    return (
      <AddressSearch label={label} value={value} onChange={(newValue) => onChange(newValue)} />
    );
  } else if (fieldType === 'type') {
    return (
      <SelectListItem
        typeSlug={typeSlug}
        typeId={typeId}
        label={label}
        value={itemId}
        onChange={(newValue) => onChange(newValue)}
        allowCreate
      />
    );
  } else if (fieldType === 'boolean') {
    return (
      <FormControl disabled={disabled} component="fieldset">
        <FormLabel component="legend">Select {label}</FormLabel>
        <RadioGroup
          aria-label="value"
          name="value"
          value={value}
          onChange={({ target }) => onChange(target.value)}
        >
          <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
          <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
        </RadioGroup>
        {/* {formik.touched.value && formik.errors.value && (
          <FormHelperText className="text-danger">{formik.errors.value}</FormHelperText>
        )} */}
      </FormControl>
    );
  } else if (fieldType === 'media') {
    return (
      <div>
        <FormLabel component="legend">Select {label}</FormLabel>
        <ImagePicker state={mediaState} setState={setMediaState} />
        {/* {formik.touched.media && formik.errors.media && (
          <FormHelperText className="text-danger">{formik.errors.media}</FormHelperText>
        )} */}
      </div>
    );
  }
  return (
    <div>
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        name="value"
        size="small"
        type={fieldType === 'number' ? 'number' : 'text'}
        disabled={disabled}
        value={value}
        onChange={({ target }) => onChange(target.value)}
        // error={formik.touched.value && Boolean(formik.errors.value)}
        // helperText={formik.touched.value && formik.errors.value}
      />
    </div>
  );
}
