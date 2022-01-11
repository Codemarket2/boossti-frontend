import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useGetResponses } from '@frontend/shared/hooks/response';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { useGetForm } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  label: string;
  formId: string;
  value: any;
  onChange: (form) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  formField?: string;
}

export default function SelectResponse({
  label,
  formId,
  value,
  onChange,
  error = false,
  helperText,
  disabled,
  formField,
}: IProps) {
  const { data, error: queryError, loading, state, setState } = useGetResponses(
    formId,
    null,
    formField,
  );

  return queryError ? (
    <ErrorLoading error={queryError} />
  ) : (
    <>
      <Autocomplete
        disabled={disabled}
        size="small"
        loading={loading}
        value={value}
        onChange={(event: any, newValue) => {
          onChange(newValue);
        }}
        getOptionLabel={(option) => option?.label}
        inputValue={state.search}
        onInputChange={(event, newInputValue) => {
          setState({ ...state, search: newInputValue });
        }}
        options={getLabels(formField, data?.getResponses?.data) || []}
        renderInput={(params) => (
          <TextField
            error={error}
            helperText={helperText}
            fullWidth
            {...params}
            label={label || 'Select'}
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
    </>
  );
}

const getLabels = (formField: string, responses: any[]) => {
  const labels = [];
  responses?.forEach((response) => {
    const fieldValues = response?.values?.filter((value) => value?.field === formField);
    let label = '';
    fieldValues?.forEach((f) => {
      if (f?.value) {
        label += `${f?.value} `;
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
  fieldValues?.forEach((f) => {
    if (f?.value) {
      label += `${f?.value} `;
    }
  });
  return label;
};
