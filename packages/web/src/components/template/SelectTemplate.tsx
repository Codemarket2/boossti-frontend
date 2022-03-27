import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetTemplates } from '@frontend/shared/hooks/template';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  value: any;
  onChange: (newValue: any) => void;
  filterId?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: any;
  placeholder?: string;
  label?: string;
}

export default function SelectTemplate({
  disabled,
  value,
  onChange,
  error: isError,
  helperText,
  filterId,
  placeholder = 'Select Template',
  label = 'Select Template',
}: IProps): any {
  const { data, loading, error, state, setState } = useGetTemplates({ limit: 10 });

  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <Autocomplete
      size="small"
      disabled={disabled}
      value={value}
      onChange={(event: any, newValue) => {
        onChange(newValue);
      }}
      getOptionLabel={(option) => option.title}
      inputValue={state.search}
      onInputChange={(event, newInputValue) => {
        setState({ ...state, search: newInputValue });
      }}
      options={data?.getTemplates?.data?.filter((f) => f._id !== filterId) || []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          placeholder={placeholder}
          label={label}
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
          error={isError}
          helperText={helperText}
        />
      )}
    />
  );
}
