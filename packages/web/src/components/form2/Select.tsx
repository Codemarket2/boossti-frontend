import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface IProps {
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  selectAllowCreate?: boolean;
  error?: boolean;
  helperText?: string;
}

const filter = createFilterOptions();

export default function Select({
  options = [],
  onChange,
  value,
  label = 'Select',
  selectAllowCreate = false,
  error,
  helperText,
}: IProps) {
  return (
    <Autocomplete
      size="small"
      options={options}
      getOptionLabel={(option: string) => option}
      value={value}
      onChange={(event: any, newValue: string) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          placeholder={label}
          variant="outlined"
          error={error}
          helperText={helperText}
        />
      )}
      filterOptions={(options2: any, params: any) => {
        const filtered = filter(options2, params);
        if (params.inputValue !== '' && selectAllowCreate) {
          filtered.push(params.inputValue);
        }
        return filtered;
      }}
    />
  );
}
