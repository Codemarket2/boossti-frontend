import { useState } from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
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
import { generateObjectId } from '@frontend/shared/utils/objectId';
import ReactFlow from '../react-flow/ReactFlow';
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
import UnitQuantityInput from './UnitQuantityInput';
import Board from './board/Board';
import { defaultBoard } from './board/defaultBoard';
import Diagram from '../syncfusion-diagram/Diagram';
import { defaultDiagram } from '../syncfusion-diagram/defaultDiagram';
import FieldConditionForm, { SelectSubField } from './field/field-condition/FieldConditionForm';
import 'react-phone-input-2/lib/style.css';
import Webpage from '../grapesjs/grapesOverlay';
import DisplayValue from './DisplayValue';
import ResponseDrawer from '../response/ResponseDrawer';
import Signature from '../signature/Signature';
import CraftJSField from '../craftJS/craftJSField';

export interface FieldProps {
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
  onCancel?: () => void;
}

const objectId = generateObjectId();

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
  onCancel,
}: FieldProps): any {
  useCheckUnique({
    formId,
    value,
    field,
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
  const [state, setState] = useState({ showResponseDrawer: false });

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
            noAppIdFilter={field?.form?.name?.toLowerCase() === 'users'}
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
        <div data-testid="date">
          <LocalizationProvider
            dateAdapter={AdapterMoment}

            //  libInstance={moment} utils={MomentUtils}
          >
            <div data-testid="date-picker">
              <DatePicker
                disabled={disabled}
                // fullWidth
                // size="small"
                // inputVariant="outlined"
                // placeholder={moment().format('L')}
                inputFormat="MM/DD/YYYY"
                value={value && value?.valueDate ? moment(value.valueDate) : null}
                onChange={(newValue) =>
                  onChange({ field: field?._id, valueDate: moment(newValue) })
                }
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
            </div>
          </LocalizationProvider>
        </div>
      );
    }
    case 'dateTime': {
      return (
        <div data-testid="date">
          <LocalizationProvider
            dateAdapter={AdapterMoment}

            //  libInstance={moment} utils={MomentUtils}
          >
            <div data-testid="date-picker">
              <DateTimePicker
                disabled={disabled}
                // fullWidth
                // size="small"
                // inputVariant="outlined"
                // placeholder={moment().format('L')}
                inputFormat="lll"
                value={value && value?.valueDate ? moment(value.valueDate) : null}
                onChange={(newValue) =>
                  onChange({ field: field?._id, valueDate: moment(newValue) })
                }
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
            </div>
          </LocalizationProvider>
        </div>
      );
    }
    case 'richTextarea': {
      return (
        <div data-testid="richTextarea">
          <RichTextarea
            value={value?.value || ''}
            onChange={(newValue) => onChange({ value: newValue })}
          />
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </div>
      );
    }
    case 'webpage': {
      return (
        <>
          <Webpage
            editMode
            value={value?.value || ''}
            onChange={(html) => onChange({ value: html })}
          />
        </>
      );
    }
    case 'signature': {
      return (
        <>
          <Signature
            value={value?.value || ''}
            onChange={(dataUrl) => onChange({ value: dataUrl })}
          />
        </>
      );
    }
    case 'boolean': {
      return (
        <>
          <div data-testid="boolean">
            <FormControlLabel
              disabled={disabled}
              control={
                <Checkbox
                  data-testid="boolean-checkbox"
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
          </div>
        </>
      );
    }
    case 'image': {
      return (
        <>
          <div data-testid="image">
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
          </div>
        </>
      );
    }
    case 'file': {
      return (
        <div data-testid="file">
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
          <div data-testid="phone-input">
            <PhoneInput
              countryCodeEditable={false}
              country="us"
              preferredCountries={['us']}
              enableSearch
              value={value?.valueNumber?.toString() || ''}
              onChange={(phone) => onChange({ field: field?._id, valueNumber: phone })}
              inputStyle={validation.error ? { borderColor: 'red' } : {}}
            />
          </div>
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
        <div data-testid="number">
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
        </div>
      );
    }
    case 'colorPicker': {
      return (
        <div data-testid="color-picker">
          <ColorInput
            label=""
            color={value ? value.value : ''}
            onColorChange={(e: any) => onChange({ field: field?._id, value: e })}
          />
        </div>
      );
    }
    case 'barcodeScanner': {
      return (
        <div data-testid="barcode-scanner">
          <BarcodeInput
            label=""
            barcode={value ? value.value : ''}
            onBarcodeChange={(e: any) => onChange({ field: field?._id, value: e })}
          />
        </div>
      );
    }
    case 'address': {
      return (
        <div data-testid="addressSearch">
          {' '}
          <AddressSearch _id={field?._id} onChange={onChange} values={value} />
        </div>
      );
    }
    case 'lighthouseReport': {
      return (
        <div data-testid="lighthouse-report">
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
        </div>
      );
    }
    case 'link': {
      const textValidation = validateValue(validate, value, {
        ...field,
        fieldType: ['link'].includes(field?.fieldType) ? 'url' : 'text',
      });
      return (
        <div data-testid="link">
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
        </div>
      );
    }
    case 'response': {
      // if (field?.options?.dependentRelationship) {
      //   return <>field?.options?.dependentRelationship</>;
      // }
      return (
        <>
          <div data-testid="response">
            {value?.response?._id ? (
              <div
                data-testid="responseId"
                className="mb-2 d-flex align-items-center justify-content-between"
              >
                <DisplayValue field={field} value={value} />
                <div>
                  <IconButton
                    onClick={() =>
                      setState((oldState) => ({ ...oldState, showResponseDrawer: true }))
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onChange({ response: null })}>
                    <Delete />
                  </IconButton>
                  <ResponseDrawer
                    open={state.showResponseDrawer}
                    onClose={() =>
                      setState((oldState) => ({ ...oldState, showResponseDrawer: false }))
                    }
                    responseId={value?.response?._id}
                  />
                </div>
              </div>
            ) : (
              <>
                <div data-testid="responseModal">
                  {field?.form?._id && addOption?.showDrawer && (
                    <CreateResponseDrawer
                      open={addOption?.showDrawer}
                      onClose={() => setAddOption({ ...addOption, showDrawer: false })}
                      title={field?.label}
                      formId={field?.form?._id}
                      createCallback={(newResponse) => {
                        if (field?.options?.dependentRelationship) {
                          onCancel();
                        } else {
                          onChange({ field: field?._id, response: newResponse });
                          setAddOption({ ...addOption, showDrawer: false });
                        }
                      }}
                    />
                  )}
                </div>
                <Button
                  disabled={disabled}
                  data-testid="response-button"
                  variant="contained"
                  size="small"
                  className="mt-2"
                  onClick={() => setAddOption({ ...addOption, showDrawer: true })}
                >
                  Add Response
                </Button>
              </>
            )}
          </div>
          {validation.error && (
            <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
          )}
        </>
      );
    }
    case 'form': {
      return (
        <>
          <div data-testid="form">
            <SelectForm
              placeholder={`${field?.label} form`}
              label={null}
              value={value?.form}
              onChange={(newValue) => onChange({ field: field?._id, form: newValue })}
              error={validation.error}
              helperText={validation.errorMessage}
            />
          </div>
        </>
      );
    }
    case 'formField': {
      return (
        <>
          <SelectForm
            placeholder={`${field?.label} form`}
            label={null}
            value={value?.form}
            onChange={(newValue) => {
              const payload: any = { form: newValue };
              if (value?.form?._id !== newValue?._id) {
                payload.options = { ...value?.options, subField: null };
              }
              onChange(payload);
            }}
            error={validation.error}
            helperText={validation.errorMessage}
          />
          {value?.form && (
            <SelectSubField
              subField={{ ...value?.options?.subField, formId: value?.form?._id }}
              onChange={(subField) => onChange({ options: { ...value?.options, subField } })}
            />
          )}
        </>
      );
    }
    case 'board': {
      return (
        <>
          <div data-testid="board">
            <Board
              editMode
              board={value?.options?.board || defaultBoard}
              onBoardChange={(board) => onChange({ options: { board } })}
            />
            {validation.error && (
              <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
            )}
          </div>
        </>
      );
    }
    case 'diagram': {
      return (
        <>
          <div data-testid="diagram">
            <Diagram
              value={value?.options?.diagram || defaultDiagram}
              onChange={(diagram) => onChange({ options: { diagram } })}
            />
            {validation.error && (
              <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
            )}
          </div>
        </>
      );
    }
    case 'flowDiagram': {
      return (
        <>
          <div data-testid="flow-diagram">
            <ReactFlow
              _id={value?._id || objectId}
              editMode
              flow={value?.options?.flowDiagram}
              onFlowChange={(flowDiagram) => onChange({ options: { flowDiagram } })}
              noOverlay
            />
            {validation.error && (
              <FormHelperText className="text-danger">{validation.errorMessage}</FormHelperText>
            )}
          </div>
        </>
      );
    }
    case 'condition': {
      return (
        <>
          <div data-testid="condition">
            <FieldConditionForm
              conditions={value?.options?.conditions}
              onConditionsChange={(conditions) => onChange({ options: { conditions } })}
            />
          </div>
        </>
      );
    }

    case 'craftjs': {
      return (
        <>
          <CraftJSField
            EncodedPageContent={value?.value}
            onChange={(PageContentJSON) => onChange({ field: field?._id, value: PageContentJSON })}
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
