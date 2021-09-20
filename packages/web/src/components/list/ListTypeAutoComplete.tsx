import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useCRUDFieldValue } from '@frontend/shared/hooks/field';
import { useGetListItemsByType } from '@frontend/shared/hooks/list';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import ItemFormDrawer from '../list/ItemFormDrawer';
import ImagePicker from '../common/ImagePicker';
import { onAlert } from '../../utils/alert';
import { useEffect, useState } from 'react';
import moment from 'moment';
import AddressSearch from '../common/AddressSearch';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  typeId: string;
  label: string;
  typeSlug: any;
  disabled?: boolean;
  value: string;
  onChange: (arg: string) => void;
}

export default function ListTypeAutoComplete({
  typeId,
  disabled = false,
  value,
  onChange,
  typeSlug,
  label,
}: IProps) {
  const { data, error, loading, state, setState } = useGetListItemsByType({
    limit: 10,
    types: [typeId],
  });
  const [drawer, setDrawer] = useState({ showDrawer: false });

  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      <Autocomplete
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
            // error={formik.touched.itemId && Boolean(formik.errors.itemId)}
            // helperText={formik.touched.itemId && formik.errors.itemId}
            fullWidth
            {...params}
            label={`Select Value`}
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
        onClick={() => setDrawer({ ...drawer, showDrawer: true })}>
        Add Your New {label}
      </Button>
    </>
  );
}
