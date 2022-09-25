import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useGetResponses } from '@frontend/shared/hooks/response';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorLoading from '../common/ErrorLoading';
import CreateResponseDrawer from './CreateResponseDrawer';

export interface IProps {
  formId: string;
  value: any;
  onChange: (response) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  formField?: string;
  openDrawer?: any;
  allowCreate?: boolean;
  onlyMyResponses?: boolean;
  onChangeFullResponse?: (response: any) => void;
  floatingLabel?: boolean;
}

const filter = createFilterOptions();

export default function SelectResponse({
  label = 'Select Response',
  formId,
  value = null,
  onChange,
  onChangeFullResponse,
  error = false,
  helperText,
  disabled,
  formField,
  openDrawer,
  allowCreate,
  onlyMyResponses,
  floatingLabel,
}: IProps) {
  const { data, error: queryError, loading, state, setState } = useGetResponses({
    formId,
    formField,
    onlyMy: onlyMyResponses,
  });

  const [addOption, setAddOption] = useState({ showDrawer: false });

  useEffect(() => {
    if (!value?.label && value?.values) {
      onChange(getLabels(formField, [value])?.pop());
    }
  }, [value]);

  if (queryError) {
    return <ErrorLoading error={queryError} />;
  }

  return (
    <>
      <div data-testid="selectResponse">
        <Autocomplete
          data-testid="Autocomplete"
          disabled={disabled}
          size="small"
          loading={loading}
          value={value}
          onChange={(event: any, newValue) => {
            if (newValue?.openDrawer) {
              if (openDrawer) {
                openDrawer();
              } else {
                onChange(null);
                setAddOption({ ...addOption, showDrawer: true });
              }
            } else {
              if (onChangeFullResponse) {
                const response = data?.getResponses?.data?.find((r) => r?._id === newValue?._id);
                if (response) {
                  onChangeFullResponse(response);
                }
              }
              onChange(newValue);
            }
          }}
          options={getLabels(formField, data?.getResponses?.data) || []}
          getOptionLabel={(option) => option?.label}
          inputValue={state.search}
          onInputChange={(event, newInputValue) => {
            setState({ ...state, search: newInputValue });
          }}
          filterOptions={(options, params) => {
            let filtered = filter(options, params);
            filtered = filtered.map((option: any) => {
              return { ...option, label: option?.label?.split('{{}}')?.[0] };
            });
            if (params.inputValue !== '' && !loading && allowCreate) {
              filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
                openDrawer: true,
              });
            }
            return filtered;
          }}
          renderInput={(params) => (
            <div data-testid="TextField">
              <TextField
                {...params}
                error={error}
                helperText={helperText}
                fullWidth
                placeholder={label || 'Select'}
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
            </div>
          )}
        />

        {addOption?.showDrawer && (
          <div data-testid="CreateResponseDrawer">
            <CreateResponseDrawer
              open={addOption?.showDrawer}
              onClose={() => setAddOption({ ...addOption, showDrawer: false })}
              title={label}
              formId={formId}
              createCallback={(newResponse) => {
                onChange(getLabels(formField, [newResponse])?.pop());
                setAddOption({ ...addOption, showDrawer: false });
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

const getLabels = (formField: string, responses: any[]) => {
  const labels = [];
  responses?.forEach((response) => {
    let label = '';
    response?.values?.forEach((value, i) => {
      const fieldValue = value?.value || value?.valueNumber;
      if (fieldValue) {
        if (value?.field?.toString() === formField) {
          label = fieldValue + label;
        } else {
          label += `{{}} ${fieldValue}`;
        }
      }
    });
    // const fieldValues = response?.values?.filter((value) => value?.field === formField);
    // fieldValues?.forEach((f, i) => {
    //   if (f?.value) {
    //     label += i > 0 ? `${f?.value}` : f?.value;
    //   }
    // });
    if (label) {
      return labels.push({ label, _id: response?._id });
    }
  });
  return labels;
};

export const getLabel = (formField: string, response: any): string => {
  let label = '';
  response?.values
    ?.filter((value) => value?.field === formField)
    ?.forEach((value, i) => {
      const fieldValue = value?.value || value?.valueNumber;
      if (fieldValue) {
        label += i > 0 ? ` ${fieldValue}` : fieldValue;
      }
    });
  return label || response?.label;
};
