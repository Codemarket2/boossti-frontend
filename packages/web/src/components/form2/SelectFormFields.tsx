import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Skeleton from '@material-ui/lab/Skeleton';
import { useGetForm } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  formId: string;
  value: any;
  onChange: (form) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export default function SelectFormFields({
  formId,
  value,
  onChange,
  error = false,
  helperText,
  disabled,
}: IProps) {
  const { data, error: queryError, loading } = useGetForm(formId);

  return loading ? (
    <Skeleton height={50} />
  ) : queryError ? (
    <ErrorLoading error={queryError} />
  ) : (
    <FormControl fullWidth size="small" variant="outlined" disabled={disabled} error={error}>
      <InputLabel id="select-form-field">Select form field </InputLabel>
      <Select
        labelId="select-form-field"
        name="formField"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Select form field"
      >
        {data?.getForm?.fields?.map((f) => (
          <MenuItem key={f?._id} value={f?._id}>
            {f?.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText className="text-danger">{helperText}</FormHelperText>}
    </FormControl>
  );
}
