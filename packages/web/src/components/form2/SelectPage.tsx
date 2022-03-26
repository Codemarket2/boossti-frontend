import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useGetPagesByTemplate } from '@frontend/shared/hooks/template';
import ItemFormDrawer from '../template/PageFormDrawer';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  templateId: string;
  label: string;
  typeSlug: any;
  disabled?: boolean;
  value: string;
  onChange: (arg: string) => void;
  error?: boolean;
  helperText?: any;
  allowCreate?: boolean;
}

const filter = createFilterOptions();

export default function SelectPage({
  templateId,
  disabled = false,
  value,
  onChange,
  typeSlug,
  label,
  error = false,
  helperText,
  allowCreate,
}: IProps): any {
  const { data, error: queryError, loading, state, setState } = useGetPagesByTemplate(templateId);
  const [drawer, setDrawer] = useState({ showDrawer: false });

  if (queryError || !templateId) {
    return <ErrorLoading error={queryError || { message: 'Please select Existing Type' }} />;
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
        options={data?.getPages?.data || []}
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
            error={error}
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
          templateId={templateId}
          onSelect={(newValue) => {
            onChange(newValue);
            setDrawer({ showDrawer: false });
          }}
        />
      )}
    </>
  );
}
