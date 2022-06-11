/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import InputGroup from '../common/InputGroup';
import { getFormFieldTypes, fieldTypes, selectOptionsTypes } from './fieldTypes';
import SelectTemplate from '../template/SelectTemplate';
import InlineInput from '../common/InlineInput';
import SelectForm from './SelectForm';
import SelectFormFields from './SelectFormFields';
import RichTextarea from '../common/RichTextarea2';
import FormFieldRules from './Rules/FormFieldRules';

type TProps = {
  field: any;
  onFieldChange: (newValue: any) => void;
  onClose: () => void;
  isSection?: boolean;
  fields: any[];
  parentFields?: any[];
};

const initialState = { showForm: false };

const globalFields = [
  { label: 'User name', globalState: true, _id: 'userName' },
  { label: 'User email', globalState: true, _id: 'userEmail' },
];

export default function FormFields({
  onFieldChange,
  field,
  onClose,
  isSection = false,
  fields,
  parentFields: tParentFields,
}: TProps): any {
  const onOptionChange = (updatedOption) => {
    onFieldChange({ ...field, options: { ...field.options, ...updatedOption } });
  };

  const [state, setState] = useState(initialState);
  useEffect(() => {
    setState(initialState);
  }, [field.fieldType]);

  const parentFields = [...tParentFields, ...globalFields];

  return (
    <>
      <Typography variant="h5" className="d-flex align-items-center">
        <Tooltip title="Go Back">
          <IconButton onClick={onClose} size="large">
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <InlineInput
          placeholder="Field Label"
          value={field.label}
          onChange={(e) => onFieldChange({ ...field, label: e.target.value })}
        />
      </Typography>
      <Divider />
      <div className="px-3">
        <InputGroup>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="fieldType-simple-select-outlined-label">Field Type</InputLabel>
            <Select
              labelId="fieldType-simple-select-outlined-label"
              id="fieldType-simple-select-outlined"
              name="fieldType"
              value={field.fieldType}
              onChange={(e) => onFieldChange({ ...field, fieldType: e.target.value })}
              label="Field Type"
            >
              {getFormFieldTypes(isSection)?.map((option, index) => (
                <MenuItem value={option.value} key={index}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputGroup>
        {field.fieldType === 'template' && (
          <InputGroup>
            <SelectTemplate
              value={field.template}
              onChange={(newTemplate) => onFieldChange({ ...field, template: newTemplate })}
            />
          </InputGroup>
        )}
        {!['label', 'form', 'template'].includes(field.fieldType) && (
          <>
            <InputGroup>
              <FormControlLabel
                disabled={field?.options?.default}
                control={
                  <Checkbox
                    checked={field?.options?.required}
                    onChange={({ target }) => onOptionChange({ required: target.checked })}
                    name="required"
                    color="primary"
                  />
                }
                label="Required"
              />
            </InputGroup>
            <InputGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field?.options?.multipleValues}
                    onChange={({ target }) => onOptionChange({ multipleValues: target.checked })}
                    name="multipleValues"
                    color="primary"
                  />
                }
                label="Mutiple values"
              />
            </InputGroup>
            <InputGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field?.options?.unique}
                    onChange={({ target }) => {
                      onOptionChange({
                        unique: target.checked,
                        required: target.checked ? true : field?.options?.required,
                      });
                    }}
                    name="unique"
                    color="primary"
                  />
                }
                label="Unique"
              />
            </InputGroup>
            {field?.options?.unique && (
              <div className="pl-3 mt-n3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field?.options?.caseInsensitiveUnique}
                      onChange={({ target }) => {
                        onOptionChange({
                          caseInsensitiveUnique: target.checked,
                        });
                      }}
                      name="caseInsensitiveUnique"
                      color="primary"
                    />
                  }
                  label="Case insensitive unique"
                />{' '}
              </div>
            )}
          </>
        )}
        {field.fieldType === 'label' && (
          <RichTextarea
            value={field.options.staticText}
            onChange={(val) => onOptionChange({ staticText: val })}
          />
        )}
        {field.fieldType === 'form' && (
          <InputGroup>
            <SelectForm
              value={field.form}
              onChange={(newValue) =>
                onFieldChange({
                  ...field,
                  form: newValue,
                  options: { ...field.options, formField: '' },
                })
              }
              error={!field.form}
              helperText={!field.form && 'required'}
            />
          </InputGroup>
        )}
        {field.fieldType === 'existingForm' && (
          <InputGroup>
            <SelectForm
              value={field.form}
              onChange={(newValue) =>
                onFieldChange({
                  ...field,
                  form: newValue,
                  options: { ...field.options, formField: '' },
                })
              }
              error={!field.form}
              helperText={!field.form && 'required'}
            />
            {field.form && (
              <div className="mt-3">
                <SelectFormFields
                  formId={field.form?._id}
                  value={field?.options?.formField}
                  onChange={(newValue) => onOptionChange({ formField: newValue })}
                  error={!field?.options?.formField}
                  helperText={!field?.options?.formField && 'required'}
                />
              </div>
            )}
          </InputGroup>
        )}
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.showCommentBox}
                onChange={({ target }) => onOptionChange({ showCommentBox: target.checked })}
                name="showCommentBox"
                color="primary"
              />
            }
            label="Show CommentBox"
          />
        </InputGroup>
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.showStarRating}
                onChange={({ target }) => onOptionChange({ showStarRating: target.checked })}
                name="showStarRating"
                color="primary"
              />
            }
            label="Show Star Ratings"
          />
        </InputGroup>
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.notEditable}
                onChange={({ target }) => onOptionChange({ notEditable: target.checked })}
                name="notEditable"
                color="primary"
              />
            }
            label="Response Not Editable"
          />
        </InputGroup>
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.output}
                onChange={({ target }) => onOptionChange({ output: target.checked })}
                name="output"
                color="primary"
              />
            }
            label="System Calculated & Saved"
          />
        </InputGroup>
        {field?.options?.output && (
          <InputGroup>
            <FormControl fullWidth size="small">
              <InputLabel id="system-value-select-label">System value</InputLabel>
              <Select
                labelId="system-value-select-label"
                id="system-value-select"
                value={field?.options?.systemValue?.fieldId}
                label="System value"
                onChange={({ target }) => {
                  let systemValue = {};
                  if (globalFields?.find((g) => g._id === target.value)) {
                    systemValue = {
                      fieldId: target?.value,
                      globalState: true,
                    };
                  } else {
                    const selectedField = parentFields?.find((f) => f?._id === target?.value);
                    systemValue = {
                      fieldId: target?.value,
                      formId: selectedField?.formId,
                    };
                  }
                  onOptionChange({ systemValue });
                }}
              >
                {parentFields
                  ?.filter((f) => f?._id !== field?._id)
                  ?.map((formField) => (
                    <MenuItem key={formField?._id} value={formField?._id}>
                      {formField?.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </InputGroup>
        )}
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.systemCalculatedAndView}
                onChange={({ target }) =>
                  onOptionChange({ systemCalculatedAndView: target.checked })
                }
                name="systemCalculatedAndView"
                color="primary"
              />
            }
            label="System Calculated & View"
          />
        </InputGroup>
        <InputGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={field?.options?.hidden}
                onChange={({ target }) => onOptionChange({ hidden: target.checked })}
                name="hidden"
                color="primary"
              />
            }
            label="Hidden"
          />
        </InputGroup>
        {field.fieldType === 'select' && (
          <>
            <InputGroup>
              <SelectOptionType
                value={field?.options?.optionsTemplate}
                onChange={(optionsTemplate) => onOptionChange({ optionsTemplate })}
              />
            </InputGroup>
            {!['type', 'existingForm'].includes(field?.options?.optionsTemplate) && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field?.options?.showAsCheckbox}
                    onChange={({ target }) => onOptionChange({ showAsCheckbox: target.checked })}
                    name="showAsCheckbox"
                    color="primary"
                  />
                }
                label="Display options as checkbox"
              />
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={field?.options?.selectAllowCreate}
                  onChange={({ target }) => onOptionChange({ selectAllowCreate: target.checked })}
                  name="selectAllowCreate"
                  color="primary"
                />
              }
              label="Allow user to create new option"
            />
            <InputGroup>
              {field?.options?.optionsTemplate === 'template' ? (
                <SelectTemplate
                  value={field.template}
                  onChange={(newValue) => onFieldChange({ ...field, template: newValue })}
                />
              ) : field?.options?.optionsTemplate === 'existingForm' ? (
                <>
                  <SelectForm
                    value={field.form}
                    onChange={(newValue) =>
                      onFieldChange({
                        ...field,
                        form: newValue,
                        options: { ...field.options, formField: '' },
                      })
                    }
                  />
                  {field.form && (
                    <div className="mt-3">
                      <SelectFormFields
                        formId={field.form?._id}
                        value={field?.options?.formField}
                        onChange={(newValue) => onOptionChange({ formField: newValue })}
                        error={!field?.options?.formField}
                        helperText={!field?.options?.formField && 'required'}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <FormLabel>
                    Select Options
                    <Tooltip title="Add New Option">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          onOptionChange({
                            selectOptions: field?.options?.selectOptions
                              ? [...field?.options?.selectOptions, '']
                              : [''],
                          })
                        }
                        size="large"
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Tooltip>
                  </FormLabel>
                  {field?.options?.selectOptions?.map((option, index) => (
                    <FormControl
                      variant="outlined"
                      fullWidth
                      size="small"
                      key={index}
                      className="mt-2"
                    >
                      <InputLabel htmlFor={`outlined-adornment-${index + 1}`}>
                        Option {index + 1}
                      </InputLabel>
                      <OutlinedInput
                        id={`outlined-adornment-${index + 1}`}
                        type="text"
                        value={option}
                        onChange={({ target }) =>
                          onOptionChange({
                            selectOptions: field?.options?.selectOptions?.map((m, i) =>
                              i === index ? target.value : m,
                            ),
                          })
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                onOptionChange({
                                  selectOptions: field?.options?.selectOptions?.filter(
                                    (m, i) => i !== index,
                                  ),
                                })
                              }
                              edge="end"
                              size="large"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        // labelWidth={65}
                      />
                    </FormControl>
                  ))}
                </>
              )}
            </InputGroup>
          </>
        )}
        <Typography variant="h6" className="d-flex align-items-center">
          Rules
          {!(state.showForm && field.fieldType === 'number') && (
            <Tooltip title="Add New Rule">
              <IconButton
                color="primary"
                onClick={() => {
                  if (field.fieldType === 'number') setState({ ...state, showForm: true });
                }}
                size="large"
              >
                {field?.options?.rules ? <EditOutlinedIcon /> : <AddCircleIcon />}
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        {state.showForm && field.fieldType === 'number' && (
          <FormFieldRules
            onCancel={() => setState(initialState)}
            onOptionChange={onOptionChange}
            fields={fields}
            activeField={field}
            data={field?.options?.rules || 'no data'}
          />
        )}
      </div>
    </>
  );
}

export const SelectOptionType = ({
  value,
  onChange,
  error,
  helperText,
}: {
  value: string;
  onChange: (newValue: any) => void;
  error?: boolean;
  helperText?: string;
}) => {
  return (
    <FormControl variant="outlined" fullWidth size="small" error={error}>
      <InputLabel id="fieldType-simple-select-outlined-label">Options list type</InputLabel>
      <Select
        labelId="fieldType-simple-select-outlined-label"
        id="fieldType-simple-select-outlined"
        name="fieldType"
        value={value}
        onChange={({ target }) => onChange(target.value)}
        label="Options list type"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {selectOptionsTypes?.map((option, index) => (
          <MenuItem key={index} value={option?.value}>
            {option?.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
