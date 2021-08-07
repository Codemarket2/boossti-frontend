import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import { useGetListTypes } from '@frontend/shared/hooks/list';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';
import ErrorLoading from '../common/ErrorLoading';
import ImagePicker from '../common/ImagePicker';

const names = [
  { name: 'Oliver Hansen', _id: '121' },
  { name: 'rhtr', _id: '122' },
  { name: 'dw Hansen', _id: '123' },
  { name: 'e2 Hansen', _id: '124' },
  { name: 'rth Hansen', _id: '125' },
  { name: 'tyu', _id: '126' },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IProps {
  open: boolean;
  handleChangeTypes: (arg: any) => void;
  onClose: () => void;
  formik: any;
  disabled?: boolean;
  state: any;
  setState: any;
}
export default function ListForm({
  open,
  onClose,
  formik,
  disabled = false,
  handleChangeTypes,
  state,
  setState,
}: IProps) {
  const { data, loading, error } = useGetListTypes();
  // const [lisTypes, setLisTypes] = useState([]);

  // const handleChange = (event: any) => {
  //   console.log('event.target.value', JSON.parse(event.target.value[0]));
  //   setLisTypes(event.target.value);
  // };

  // useEffect(() => {
  //   if (data && data.getListTypes) {
  //     console.log('data.getListItems', data.getListTypes);
  //     setLisTypes(data.getListTypes.data.map((t) => JSON.stringify(t)));
  //   }
  // }, [data]);

  // console.log('lisTypes', lisTypes);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={formik.isSubmitting ? null : onClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {formik.values.edit ? 'Update List Item' : 'Add List Item'}
      </DialogTitle>
      {error || !data ? (
        <ErrorLoading error={error} />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <InputGroup>
              <FormControl className="w-100">
                <InputLabel id="demo-mutiple-checkbox-label">Types</InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={formik.values.types}
                  onChange={(event) => handleChangeTypes(event.target.value)}
                  input={<Input />}
                  renderValue={(selected) => (
                    <div className="d-flex flex-wrap">
                      {(selected as string[]).map((value, i) => (
                        <Chip
                          className="m-1"
                          color="primary"
                          key={i}
                          label={JSON.parse(value).name}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}>
                  {data.getListTypes.data.map((t) => (
                    <MenuItem key={t._id} value={JSON.stringify(t)}>
                      <Checkbox
                        checked={
                          formik.values.types.filter((st: any) => JSON.parse(st)._id === t._id)
                            .length > 0
                        }
                      />
                      <ListItemText primary={t.name} />
                    </MenuItem>
                  ))}
                </Select>
                {formik.errors.types && (
                  <FormHelperText className="text-danger">{formik.errors.types}</FormHelperText>
                )}
              </FormControl>
            </InputGroup>
            <InputGroup>
              <TextField
                fullWidth
                variant="outlined"
                label="Title*"
                name="title"
                type="text"
                disabled={formik.isSubmitting}
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </InputGroup>
            <InputGroup>
              <TextField
                fullWidth
                variant="outlined"
                label="Description*"
                name="description"
                type="text"
                disabled={formik.isSubmitting}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </InputGroup>
            <InputGroup>
              <ImagePicker state={state} setState={setState} />
            </InputGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={formik.isSubmitting} color="primary">
              Cancel
            </Button>
            <LoadingButton type="submit" color="primary" loading={formik.isSubmitting}>
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
}
