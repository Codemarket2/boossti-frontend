import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Skeleton from '@mui/material/Skeleton';
import { useGetForm } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  formId: string;
  value: any;
  onChange: (fieldId, label, formName) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  label?: string;
  showSchemaFields?: boolean;
}

export type { IProps as ISelectFormFieldsComponentProps };

export default function SelectFormFields({
  formId,
  value,
  onChange,
  error = false,
  helperText,
  disabled,
  label = 'Select form field',
  showSchemaFields = false,
}: IProps) {
  const { data, error: queryError, loading } = useGetForm(formId);

  return loading ? (
    <Skeleton height={50} />
  ) : queryError ? (
    <ErrorLoading error={queryError} />
  ) : (
    <FormControl fullWidth size="small" variant="outlined" disabled={disabled} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        name="formField"
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value,
            data?.getForm?.fields.find((f) => f?._id === e.target.value)?.label,
            data?.getForm?.name,
          )
        }
        label={label}
      >
        <MenuItem value="_id">_id (Response ID)</MenuItem>
        <MenuItem value="createdBy">createdBy (User)</MenuItem>
        <MenuItem value="createdAt">createdAt (Date)</MenuItem>
        {/* ?.filter((f) => ['text', 'email'].includes(f.fieldType)) */}
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
