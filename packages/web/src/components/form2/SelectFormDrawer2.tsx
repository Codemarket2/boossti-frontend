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

interface IProps {
  open: boolean;
  onClose: () => void;
  onSelect: (formId: string) => void;
}

export default function SelectFormDrawer2({ open, onClose, onSelect }: IProps) {
  const { data, error, loading, state, setState } = useGetForms({ page: 1, limit: 10 });
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
        {error ? (
          <ErrorLoading error={error} />
        ) : (
          <Autocomplete
            size="small"
            loading={loading}
            value={values.form}
            onChange={(event: any, newValue) => {
              setValues({ ...values, form: newValue });
            }}
            getOptionLabel={(option) => option.name}
            inputValue={state.search}
            onInputChange={(event, newInputValue) => {
              setState({ ...state, search: newInputValue });
            }}
            options={data?.getForms?.data || []}
            renderInput={(params) => (
              <TextField
                error={!values.form && values.validate}
                helperText={!values.form && values.validate && 'required'}
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
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary" variant="contained" size="small">
          Save
        </Button>
        <Button onClick={onClose} color="primary" variant="outlined" size="small">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
