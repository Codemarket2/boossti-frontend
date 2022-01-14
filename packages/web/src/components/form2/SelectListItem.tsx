import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
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
  allowCreate?: boolean;
}

const filter = createFilterOptions();

export default function SelectListItem({
  typeId,
  disabled = false,
  value,
  onChange,
  typeSlug,
  label,
  vError = false,
  helperText,
  allowCreate,
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
          if (newValue?.openDrawer) {
            onChange(null);
            setDrawer({ ...drawer, showDrawer: true });
          } else {
            onChange(newValue);
          }
        }}
        getOptionLabel={(option) => option.title}
        inputValue={state.search}
        onInputChange={(event, newInputValue) => {
          setState({ ...state, search: newInputValue });
        }}
        options={data?.getListItems?.data || []}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== '' && !loading && allowCreate) {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
              openDrawer: true,
            });
          }
          return filtered;
        }}
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
      {drawer.showDrawer && (
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
      )}
    </>
  );
}
