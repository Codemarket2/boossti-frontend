import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useGetForms } from '@frontend/shared/hooks/form';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorLoading from '../common/ErrorLoading';
import LoadingButton from '../common/LoadingButton';

interface IProps2 {
  open: boolean;
  onClose: () => void;
  onSelect: (formId: string) => void;
  loading?: boolean;
}

export function SelectFormDrawer({ open, onClose, onSelect, loading }: IProps2) {
  const [values, setValues] = useState({ form: null, validate: false });
  const handleSave = () => {
    if (values.form?._id) {
      onSelect(values.form?._id);
    } else {
      setValues({ ...values, validate: true });
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select Existing Form</DialogTitle>
      <DialogContent>
        <SelectForm
          value={values.form}
          onChange={(form) => setValues({ ...values, form })}
          error={!values.form && values.validate}
          helperText={!values.form && values.validate && 'required'}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          onClick={handleSave}
          color="primary"
          variant="contained"
          size="small"
        >
          Save
        </LoadingButton>
        <Button
          disabled={loading}
          onClick={onClose}
          color="primary"
          variant="outlined"
          size="small"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface IProps {
  value: any;
  onChange: (form) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export default function SelectForm({
  value,
  onChange,
  error = false,
  helperText,
  disabled,
}: IProps) {
  const { data, error: queryError, loading, state, setState } = useGetForms({ page: 1, limit: 10 });

  return queryError ? (
    <ErrorLoading error={queryError} />
  ) : (
    <Autocomplete
      disabled={disabled}
      size="small"
      loading={loading}
      value={value}
      onChange={(event: any, newValue) => {
        onChange(newValue);
      }}
      getOptionLabel={(option) => option.name}
      inputValue={state.search}
      onInputChange={(event, newInputValue) => {
        setState({ ...state, search: newInputValue });
      }}
      options={data?.getForms?.data || []}
      renderInput={(params) => (
        <TextField
          error={error}
          helperText={helperText}
          fullWidth
          {...params}
          label="Select Form"
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
  );
}
