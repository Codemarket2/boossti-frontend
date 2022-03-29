import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker, DatePicker } from '@material-ui/pickers';
import PhoneInput from 'react-phone-input-2';
import { validateValue } from '@frontend/shared/utils/validate';
import ImagePicker from '../common/ImagePicker';
import RichTextarea from '../common/RichTextarea2';
import DisplayRichText from '../common/DisplayRichText';
import SelectPage from '../template/SelectPage';
import SelectResponse from '../response/SelectResponse';
import Select from './Select';
import SelectForm from './SelectForm';
import SelectTemplate from '../template/SelectTemplate';
import 'react-phone-input-2/lib/style.css';
import { SelectOptionType } from './EditField';
import ImagePicker2 from '../common/ImagePicker2';
import SelectFormFields from './SelectFormFields';

interface IProps {
  disabled?: boolean;
  validate: boolean;
  _id: string;
  label: string;
  fieldType: string;
  template: any;
  options: any;
  value: any;
  onChangeValue: (arg: any) => void;
  mediaState: any;
  setMediaState: any;
  form: any;
  formId?: any;
}

export default function Field({
  disabled = false,
  validate,
  _id,
  label,
  fieldType,
  template,
  options,
  value,
  onChangeValue,
  form,
  formId,
}: IProps): any {
  const onChange = (payload) => {
    onChangeValue({ ...value, ...payload });
  };

  const onChangeCheckbox = ({ target }) => {
    let newValues = [];
    if (value.values) {
      newValues = [...value.values];
    }
    if (target.checked && !newValues.includes(target.name)) {
      newValues.push(target.name);
    } else {
      newValues.splice(newValues.indexOf(target.name), 1);
    }
    onChange({ values: newValues });
  };

  const validation = validateValue(validate, value, { options, fieldType, template, form });

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
            value={value && value?.valueDate ? moment(value.valueDate) : null}
            onChange={(newValue) => onChange({ field: _id, valueDate: moment(newValue) })}
            animateYearScrolling
            error={validation.error}
            helperText={validation.errorMessage}
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
            value={value && value?.valueDate ? moment(value.valueDate) : null}
            onChange={(newValue) => onChange({ field: _id, valueDate: moment(newValue) })}
            animateYearScrolling
            error={validation.error}
            helperText={validation.errorMessage}
          />
        </MuiPickersUtilsProvider>
      );
    }
    case 'richTextarea': {
      return (
        <>
          <RichTextarea
            value={value?.value || ''}
            onChange={(newValue) => onChange({ value: newValue })}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
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
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'image': {
      return (
        <div>
          <ImagePicker2
            label="Select Image"
            fileType="image/*"
            // mutiple={options?.multipleValues}
            state={value}
            setState={(newValue) => onChange({ field: _id, ...newValue })}
            formId={formId}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </div>
      );
    }
    case 'select': {
      const optionsTemplate = options?.optionsTemplate || value?.options?.optionsTemplate;
      return (
        <>
          {!options?.optionsTemplate && (
            <div className="my-2">
              <SelectOptionType
                value={value?.options?.optionsTemplate}
                onChange={(newOptionsTemplate) =>
                  onChange({
                    field: _id,
                    options: {
                      ...value?.options,
                      optionsTemplate: newOptionsTemplate,
                    },
                  })
                }
                error={validation.error}
                helperText={validation.errorMessage}
              />
            </div>
          )}
          {optionsTemplate === 'template' ? (
            <>
              <SelectTemplate
                label={null}
                placeholder={`${label} template`}
                value={value?.template || null}
                onChange={(newValue) => onChange({ field: _id, template: newValue })}
                error={validation.error}
                helperText={validation.errorMessage}
              />
              {(template?._id || value?.template?._id) && (
                <div className="mt-2">
                  <SelectPage
                    templateId={template?._id || value?.template?._id}
                    typeSlug={template?.slug || value?.template?.slug}
                    label={null}
                    placeholder={`${label} page`}
                    error={validation.error}
                    helperText={validation.errorMessage}
                    value={value ? value.page : null}
                    onChange={(newValue) => onChange({ field: _id, page: newValue })}
                    allowCreate={options?.selectAllowCreate}
                  />
                </div>
              )}
            </>
          ) : optionsTemplate === 'existingForm' ? (
            <>
              {!form && (
                <SelectForm
                  placeholder={`${label} form`}
                  label={null}
                  value={value?.form}
                  onChange={(newValue) => onChange({ field: _id, form: newValue })}
                  error={validation.error}
                  helperText={validation.errorMessage}
                />
              )}
              {!form && value?.form?._id && (
                <div className="my-2">
                  <SelectFormFields
                    formId={value.form?._id}
                    value={value?.options?.formField}
                    onChange={(newFormField) =>
                      onChange({
                        field: _id,
                        options: {
                          ...value?.options,
                          formField: newFormField,
                        },
                      })
                    }
                    error={validation.error}
                    helperText={validation.errorMessage}
                  />
                </div>
              )}
              {(form?._id || value?.form?._id) && (
                <SelectResponse
                  label={`${label} response`}
                  formId={form?._id || value?.form?._id}
                  formField={form?._id ? options?.formField : value?.options?.formField}
                  value={value?.response}
                  onChange={(newValue) => onChange({ field: _id, response: newValue })}
                  error={validation.error}
                  helperText={validation.errorMessage}
                />
              )}
            </>
          ) : options?.showAsCheckbox ? (
            <div>
              {options?.selectOptions?.map((option, i) => (
                <FormControlLabel
                  disabled={disabled}
                  key={i}
                  control={
                    <Checkbox
                      name={option}
                      checked={value?.values?.includes(option)}
                      onChange={onChangeCheckbox}
                    />
                  }
                  label={option}
                />
              ))}
              {validation.error && (
                <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
              )}
            </div>
          ) : (
            optionsTemplate && (
              <Select
                label={label}
                options={options?.selectOptions}
                value={value ? value?.value : ''}
                onChange={(newValue) => onChange({ field: _id, value: newValue })}
                selectAllowCreate={options?.selectAllowCreate}
                error={validation.error}
                helperText={validation.errorMessage}
              />
            )
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
            value={value?.valueNumber?.toString() || ''}
            onChange={(phone) => onChange({ field: _id, valueNumber: phone })}
            inputStyle={validation.error ? { borderColor: 'red' } : {}}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
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
          error={validation.error}
          helperText={validation.errorMessage}
        />
      );
    }
    default: {
      const textValidation = validateValue(validate, value, {
        options,
        fieldType: ['email'].includes(fieldType) ? fieldType : 'text',
      });
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
          error={textValidation.error}
          helperText={textValidation.errorMessage}
        />
      );
    }
  }
}
