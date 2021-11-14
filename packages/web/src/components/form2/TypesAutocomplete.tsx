import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetListTypes } from '@frontend/shared/hooks/list';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  formik: any;
}

export default function TypeAutocomplete({ formik }: IProps): any {
  const { data, loading, error, state, setState } = useGetListTypes({ limit: 10 });

  if (error) {
    return <ErrorLoading error={error} />;
  }
  return (
    <Autocomplete
      size="small"
      disabled={formik.isSubmitting}
      value={formik.values.typeId}
      onChange={(event: any, newValue) => {
        formik.setFieldValue('typeId', newValue);
      }}
      getOptionLabel={(option) => option.title}
      inputValue={state.search}
      onInputChange={(event, newInputValue) => {
        setState({ ...state, search: newInputValue });
      }}
      options={data && data.getListTypes ? data.getListTypes.data : []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          label="Select Type"
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
          error={formik.touched.typeId && Boolean(formik.errors.typeId)}
          helperText={formik.touched.typeId && formik.errors.typeId}
        />
      )}
    />
  );
}
