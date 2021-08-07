import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircle from '@material-ui/icons/AddCircle';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';
import ImagePicker from '../common/ImagePicker';

interface IProps {
  open: boolean;
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
  state,
  setState,
}: IProps) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={formik.isSubmitting ? null : onClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {formik.values.edit ? 'Update List Type' : 'Add List Type'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <InputGroup>
            <TextField
              fullWidth
              variant="outlined"
              label="Name*"
              name="name"
              type="text"
              disabled={formik.isSubmitting}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
            <InputLabel htmlFor="my-input">Images/Video</InputLabel>
            <ImagePicker state={state} setState={setState} />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="my-input">Fields</InputLabel>
            <Button
              size="small"
              variant="outlined"
              component="span"
              color="primary"
              startIcon={<AddCircle />}>
              Add new field
            </Button>
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
    </Dialog>
  );
}
