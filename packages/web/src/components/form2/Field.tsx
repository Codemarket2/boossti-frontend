import { useState } from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import AdapterMoment from '@mui/lab/AdapterMoment';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useCheckUnique } from '@frontend/shared/hooks/response';
import PhoneInput from 'react-phone-input-2';
import { validateValue } from '@frontend/shared/utils/validate';
import { IField } from '@frontend/shared/types/form';
import { IValue } from '@frontend/shared/types/response';
import RichTextarea from '../common/RichTextarea2';
import DisplayRichText from '../common/DisplayRichText';
import SelectResponse from '../response/SelectResponse';
import Select from './Select';
import SelectForm from './SelectForm';
import ImagePicker2 from '../common/ImagePicker2';
import ColorInput from '../customMUI/ColorInput/ColorInput';
import AddressSearch from '../common/AddressSearch';
import BarcodeInput from '../customMUI/BarcodeInput/BarcodeInput';
import CreateResponseDrawer from '../response/CreateResponseDrawer';
import FileUpload from '../fileLibrary/FileUpload';
import DisplayFiles from '../fileLibrary/DisplayFiles';
import { onAlert } from '../../utils/alert';
import Response from '../response/Response';
import UnitQuantityInput from './UnitQuantityInput';
import Board from './board/Board';
import { defaultBoard } from './board/defaultBoard';
import Diagram from '../syncfusion-diagram/Diagram';
import { defaultDiagram } from '../syncfusion-diagram/defaultDiagram';
import ReactFlow from '../react-flow/ReactFlow';
import FieldConditionForm from './field-condition/FieldConditionForm';

import 'react-phone-input-2/lib/style.css';

interface FieldProps {
  field: IField;
  disabled?: boolean;
  validate?: boolean;
  value: Partial<IValue>;
  onChangeValue: (arg: IValue) => void;
  mediaState?: any;
  setMediaState?: any;
  formId?: any;
  setUnique?: any;
  responseId?: string;
  setUniqueLoading?: (args: boolean) => void;
}

export default function Field({
  field,
  disabled = false,
  validate,
  value,
  onChangeValue,
  formId,
  setUnique,
  responseId,
  setUniqueLoading,
}: FieldProps): any {
  useCheckUnique({
    formId,
    value,
    options: field?.options,
    setUnique,
    onAlert,
    responseId,
    setUniqueLoading,
  });

  const onChange = (payload) => {
    onChangeValue({ ...value, field: field?._id, ...payload });
    if (field?.options?.unique) {
      setUnique(false);
      setUniqueLoading(true);
    }
  };

  const [addOption, setAddOption] = useState({ showDrawer: false });

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

  const validation = validateValue(validate, value, field);

  if (field?.options?.selectItem && ['response', 'text', 'number'].includes(field?.fieldType)) {
    return (
      <>
        {field?.fieldType === 'response' ? (
          <SelectResponse
            label={`${field?.label} response`}
            formId={field?.form?._id}
            formField={field?.options?.formField}
            value={value?.response}
            onChange={(newValue) => onChange({ field: field?._id, response: newValue })}
            error={validation.error}
            helperText={validation.errorMessage}
            allowCreate={field?.options?.selectAllowCreate}
            onlyMyResponses={field?.options?.showOptionCreatedByUser}
          />
        ) : field?.options?.showAsCheckbox ? (
          <>
            {field?.options?.selectOptions?.map((option, i) => (
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
          </>
        ) : (
          <Select
            label={field?.label}
            options={field?.options?.selectOptions}
            value={value?.value || value?.valueNumber?.toString() || ''}
            onChange={(newValue) => {
              let valueObject: any = {};
              if (field?.fieldType === 'number') {
                valueObject = { valueNumber: newValue };
              } else {
                valueObject = { value: newValue };
              }
              onChange(valueObject);
            }}
            selectAllowCreate={field?.options?.selectAllowCreate}
            error={validation.error}
            helperText={validation.errorMessage}
          />
        )}
      </>
    );
  }

  switch (field?.fieldType) {
    case 'label': {
      return <DisplayRichText value={field?.options?.staticText} />;
    }
    case 'date': {
      return (
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          //  libInstance={moment} utils={MomentUtils}
        >
          <DatePicker
            disabled={disabled}
            // fullWidth
            // size="small"
            // inputVariant="outlined"
            // placeholder={moment().format('L')}
            inputFormat="MM/DD/YYYY"
            value={value && value?.valueDate ? moment(value.valueDate) : null}
            onChange={(newValue) => onChange({ field: field?._id, valueDate: moment(newValue) })}
            // animateYearScrolling
            renderInput={(props) => (
              <TextField
                {...props}
                fullWidth
                size="small"
                variant="outlined"
                placeholder={moment().format('L')}
                error={validation.error}
                helperText={validation.errorMessage}
              />
            )}
          />
        </LocalizationProvider>
      );
    }
    case 'dateTime': {
      return (
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          //  libInstance={moment} utils={MomentUtils}
        >
          <DateTimePicker
            disabled={disabled}
            // fullWidth
            // size="small"
            // inputVariant="outlined"
            // placeholder={moment().format('L')}
            inputFormat="lll"
            value={value && value?.valueDate ? moment(value.valueDate) : null}
            onChange={(newValue) => onChange({ field: field?._id, valueDate: moment(newValue) })}
            // animateYearScrolling
            renderInput={(props) => (
              <TextField
                {...props}
                fullWidth
                size="small"
                variant="outlined"
                placeholder={moment().format('L')}
                error={validation.error}
                helperText={validation.errorMessage}
              />
            )}
          />
        </LocalizationProvider>
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
    case 'boolean': {
      return (
        <>
          <FormControlLabel
            disabled={disabled}
            control={
              <Checkbox
                checked={value ? value.valueBoolean : false}
                onChange={({ target }) =>
                  onChange({ field: field?._id, valueBoolean: target.checked })
                }
                name="valueBoolean"
                color="primary"
              />
            }
            label={field?.label}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'image': {
      return (
        <>
          <ImagePicker2
            label="Select Image"
            fileType="image/*"
            // mutiple={options?.multipleValues}
            state={value}
            setState={(newValue) => onChange({ field: field?._id, ...newValue })}
            formId={formId}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'file': {
      return (
        <div>
          {value?.value ? (
            <DisplayFiles
              urls={[value?.value]}
              onDelete={(url) => onChange({ field: field?._id, value: '' })}
            />
          ) : (
            <FileUpload
              onUpload={(fileUrls) => onChange({ field: field?._id, value: fileUrls[0] })}
            />
          )}
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </div>
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
            onChange={(phone) => onChange({ field: field?._id, valueNumber: phone })}
            inputStyle={validation.error ? { borderColor: 'red' } : {}}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'number': {
      if (field?.options?.physicalQuantity) {
        return (
          <UnitQuantityInput
            value={value}
            label={field?.label}
            options={field?.options}
            onChange={(newValue) => onChange({ ...newValue })}
            disabled={disabled}
            error={validation.error}
            helperText={validation.errorMessage}
          />
        );
      }
      return (
        <TextField
          fullWidth
          placeholder={field?.label}
          variant="outlined"
          name="valueNumber"
          size="small"
          type="number"
          disabled={disabled}
          value={value ? value.valueNumber : ''}
          onChange={({ target }) => onChange({ field: field?._id, valueNumber: target.value })}
          error={validation.error}
          helperText={validation.errorMessage}
        />
      );
    }
    case 'colorPicker': {
      return (
        <ColorInput
          label=""
          color={value ? value.value : ''}
          onColorChange={(e: any) => onChange({ field: field?._id, value: e })}
        />
      );
    }
    case 'barcodeScanner': {
      return (
        <BarcodeInput
          label=""
          barcode={value ? value.value : ''}
          onBarcodeChange={(e: any) => onChange({ field: field?._id, value: e })}
        />
      );
    }
    case 'address': {
      return <AddressSearch _id={field?._id} onChange={onChange} values={value} />;
    }
    case 'lighthouseReport': {
      return (
        <TextField
          multiline
          rows={6}
          fullWidth
          placeholder={field?.label}
          variant="outlined"
          name="value"
          size="small"
          type={['email', 'password'].includes(field?.fieldType) ? field?.fieldType : 'text'}
          disabled
          value={value ? value.value : ''}
          onChange={({ target }) => onChange({ field: field?._id, value: target.value })}
        />
      );
    }
    case 'link': {
      const textValidation = validateValue(validate, value, {
        ...field,
        fieldType: ['link'].includes(field?.fieldType) ? 'url' : 'text',
      });
      return (
        <TextField
          fullWidth
          placeholder={field?.label}
          variant="outlined"
          name="value"
          size="small"
          type="url"
          disabled={disabled}
          value={value ? value.value : ''}
          onChange={({ target }) => onChange({ field: field?._id, value: target.value })}
          error={textValidation.error}
          helperText={textValidation.errorMessage}
        />
      );
    }
    case 'response': {
      return (
        <>
          {value?.response?._id ? (
            <Response
              hideAuthor
              responseId={value?.response?._id}
              hideBreadcrumbs
              deleteCallBack={() => onChange({ field: field?._id, response: null })}
            />
          ) : (
            <>
              {field?.form?._id && addOption?.showDrawer && (
                <CreateResponseDrawer
                  open={addOption?.showDrawer}
                  onClose={() => setAddOption({ ...addOption, showDrawer: false })}
                  title={field?.label}
                  formId={field?.form?._id}
                  createCallback={(newResponse) => {
                    onChange({ field: field?._id, response: newResponse });
                    setAddOption({ ...addOption, showDrawer: false });
                  }}
                />
              )}
              <Button
                variant="contained"
                size="small"
                className="mt-2"
                onClick={() => setAddOption({ ...addOption, showDrawer: true })}
              >
                Add
              </Button>
            </>
          )}
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'form': {
      return (
        <>
          <SelectForm
            placeholder={`${field?.label} form`}
            label={null}
            value={value?.form}
            onChange={(newValue) => onChange({ field: field?._id, form: newValue })}
            error={validation.error}
            helperText={validation.errorMessage}
          />
        </>
      );
    }
    case 'board': {
      return (
        <>
          <Board
            editMode
            board={value?.options?.board || defaultBoard}
            onBoardChange={(board) => onChange({ options: { board } })}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'diagram': {
      return (
        <>
          <Diagram
            value={value?.options?.diagram || defaultDiagram}
            onChange={(diagram) => onChange({ options: { diagram } })}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'flowDiagram': {
      return (
        <>
          <ReactFlow
            editMode
            flow={value?.options?.flowDiagram}
            onFlowChange={(flowDiagram) => onChange({ options: { flowDiagram } })}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'condition': {
      return (
        <>
          <FieldConditionForm
            conditions={value?.options?.conditions}
            onConditionsChange={(conditions) => onChange({ options: { conditions } })}
          />
        </>
      );
    }
    default: {
      const textValidation = validateValue(validate, value, {
        ...field,
        fieldType: ['email'].includes(field?.fieldType) ? field?.fieldType : 'text',
      });
      return (
        <TextField
          multiline={field?.fieldType === 'textarea'}
          rows={field?.fieldType === 'textarea' && 6}
          fullWidth
          placeholder={field?.label}
          variant="outlined"
          name="value"
          size="small"
          type={['email', 'password'].includes(field?.fieldType) ? field?.fieldType : 'text'}
          disabled={disabled}
          value={value ? value.value : ''}
          onChange={({ target }) => onChange({ field: field?._id, value: target.value })}
          error={textValidation.error}
          helperText={textValidation.errorMessage}
        />
      );
    }
  }
}
