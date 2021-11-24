import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useGetListItemsByType } from '@frontend/shared/hooks/list';
import ItemFormDrawer from '../list/ItemFormDrawer';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  typeId: string;
  label: string;
  typeSlug: any;
  disabled?: boolean;
  value: string;
  onChange: (arg: string) => void;
  vError?: boolean;
  helperText?: string;
}

export default function ListTypeAutoComplete({
  typeId,
  disabled = false,
  value,
  onChange,
  typeSlug,
  label,
  vError = false,
  helperText,
}: IProps): any {
  const { data, error, loading, state, setState } = useGetListItemsByType({
    limit: 10,
    types: [typeId],
  });
  const [drawer, setDrawer] = useState({ showDrawer: false });

  if (error || !typeId) {
    return <ErrorLoading error={error || { message: 'Please select Existing Type' }} />;
  }

  return (
    <>
      <Autocomplete
        size="small"
        loading={loading}
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
        options={data && data.getListItems ? data.getListItems.data : []}
        renderInput={(params) => (
          <TextField
            error={vError}
            helperText={helperText}
            fullWidth
            {...params}
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
      <ItemFormDrawer
        open={drawer.showDrawer}
        onClose={() => setDrawer({ showDrawer: false })}
        typeTitle={label}
        typeSlug={typeSlug}
        typeId={typeId}
        onSelect={(newValue) => {
          onChange(newValue);
          setDrawer({ showDrawer: false });
        }}
      />
      <Button
        className="mt-2"
        disabled={disabled}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => setDrawer({ ...drawer, showDrawer: true })}
      >
        Add Your New {label}
      </Button>
    </>
  );
}
