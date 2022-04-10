import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useGetResponses } from '@frontend/shared/hooks/response';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorLoading from '../common/ErrorLoading';
import CreateResponseDrawer from './CreateResponseDrawer';

interface IProps {
  label: string;
  formId: string;
  parentId?: string;
  value: any;
  onChange: (form) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  formField?: string;
  openDrawer?: any;
}

const filter = createFilterOptions();

export default function SelectResponse({
  label,
  formId,
  parentId,
  value = null,
  onChange,
  error = false,
  helperText,
  disabled,
  formField,
  openDrawer,
}: IProps) {
  const {
    data,
    error: queryError,
    loading,
    state,
    setState,
  } = useGetResponses(formId, null, formField);
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
      <Autocomplete
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
          const filtered = filter(options, params);
          if (params.inputValue !== '' && !loading) {
            filtered.push({
              inputValue: params.inputValue,
              label: `Add "${params.inputValue}"`,
              openDrawer: true,
            });
          }
          return filtered;
        }}
        renderInput={(params) => (
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
        )}
      />
      {addOption?.showDrawer && (
        <CreateResponseDrawer
          open={addOption?.showDrawer}
          onClose={() => setAddOption({ ...addOption, showDrawer: false })}
          title={label}
          formId={formId}
          parentId={parentId}
          createCallback={(newResponse) => {
            onChange(getLabels(formField, [newResponse])?.pop());
            setAddOption({ ...addOption, showDrawer: false });
          }}
        />
      )}
    </>
  );
}

const getLabels = (formField: string, responses: any[]) => {
  const labels = [];
  responses?.forEach((response) => {
    const fieldValues = response?.values?.filter((value) => value?.field === formField);
    let label = '';
    fieldValues?.forEach((f, i) => {
      if (f?.value) {
        label += i > 0 ? `${f?.value}` : f?.value;
      }
    });
    if (label) {
      return labels.push({ label, _id: response?._id });
    }
  });
  return labels;
};

export const getLabel = (formField: string, response: any): string => {
  let label = '';
  const fieldValues = response?.values?.filter((value) => value?.field === formField);
  fieldValues?.forEach((f, i) => {
    if (f?.value) {
      label += i > 0 ? `${f?.value}` : f?.value;
    }
  });
  return label || response?.label;
};
