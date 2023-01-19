import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useCreateForm, useGetForms } from '@frontend/shared/hooks/form';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { IForm } from '@frontend/shared/types/form';
import ErrorLoading from '../common/ErrorLoading';
import LoadingButton from '../common/LoadingButton';
import BackdropComponent from '../common/Backdrop';
import { onAlert } from '../../utils/alert';

interface IProps2 {
  open: boolean;
  onClose: () => void;
  onSelect: (formId: string) => void;
  loading?: boolean;
}

const filter = createFilterOptions();

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
  onChange: (form: IForm) => void;
  error?: boolean;
  helperText?: any;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}

export type { IProps as ISelectFormComponentProps };

export default function SelectForm({
  value,
  onChange,
  error = false,
  helperText,
  disabled,
  placeholder = 'Select Form',
  label = 'Select Form',
}: IProps) {
  const { data, error: queryError, loading, state, setState } = useGetForms({ page: 1, limit: 10 });
  const { handleCreateForm, createLoading } = useCreateForm({ onAlert });

  const handleAddNew = async (name: string) => {
    const payload = {
      name,
      fields: [
        {
          label: 'Field 1',
          fieldType: 'text',
          options: {
            required: true,
            default: true,
          },
        },
      ],
    };
    await handleCreateForm(payload, (newForm) => {
      onChange(newForm);
    });
  };

  const formOptions = () => {
    if (data?.getForms?.data) {
      return [...data.getForms.data, { name: 'Auth', slug: 'auth', _id: 'auth' }];
    }
    return [{ name: 'Auth', slug: 'auth', _id: 'auth' }];
  };

  return queryError ? (
    <ErrorLoading error={queryError} />
  ) : (
    <>
      <BackdropComponent open={createLoading} />
      <Autocomplete
        disabled={disabled}
        size="small"
        loading={loading}
        value={value}
        onChange={(event: any, newValue) => {
          if (newValue?.openDrawer) {
            handleAddNew(newValue.inputValue);
          } else {
            onChange(newValue);
          }
        }}
        getOptionLabel={(option) => option.name}
        inputValue={state.search}
        onInputChange={(event, newInputValue) => {
          setState({ ...state, search: newInputValue });
        }}
        options={formOptions() || []}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== '' && !loading && !(data?.getForms?.data?.length > 0)) {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
              openDrawer: true,
            });
          }
          return filtered;
        }}
        renderInput={(params) => (
          <TextField
            error={error}
            helperText={helperText}
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
          />
        )}
      />
    </>
  );
}
