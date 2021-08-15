import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
import { useCRUDFields } from '@frontend/shared/hooks/field';
import { useGetListTypes } from '@frontend/shared/hooks/list';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import { useEffect } from 'react';

interface IProps {
  onCancel: () => void;
  parentId: any;
  field?: any;
  label: string;
}

export default function ItemFieldForm({
  onCancel,
  parentId,
  field = null,
  label = 'Value',
}: IProps) {
  const { data, error, loading, state, setState } = useGetListTypes({ limit: 10 });

  const { formik, formLoading, setFormValues } = useCRUDFields({
    onAlert,
    parentId,
    createCallback: onCancel,
  });

  useEffect(() => {
    if (field) {
      setFormValues(field);
    }
  }, [field]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Under Development');
        }}
        // onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <TextField
            fullWidth
            label={label}
            variant="outlined"
            name="value"
            size="small"
            disabled={formik.isSubmitting}
            // value={formik.values.label}
            // onChange={formik.handleChange}
            error={formik.touched.label && Boolean(formik.errors.label)}
            helperText={formik.touched.label && formik.errors.label}
          />
        </InputGroup>

        {/* {formik.values.fieldType === 'type' && (
          <InputGroup>
            {error ? (
              <p>Error - {error.message}</p>
            ) : (
              <Autocomplete
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
                renderInput={(params) => (
                  <TextField fullWidth {...params} label="Select Type" variant="outlined" />
                )}
              />
            )}
          </InputGroup>
        )} */}

        <InputGroup>
          <LoadingButton type="submit" loading={formLoading} size="small">
            Save
          </LoadingButton>
          <Button
            className="ml-2"
            disabled={formLoading}
            variant="outlined"
            size="small"
            onClick={onCancel}>
            Cancel
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}
