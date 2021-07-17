import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';

interface IProps {
  open: boolean;
  onClose: () => void;
  formik: any;
  edit: boolean;
}
export default function ListForm({ open, onClose, formik, edit }: IProps) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={formik.isSubmitting ? null : onClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{edit ? 'Edit List Item' : 'Add List Item'}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <InputGroup>
            <TextField
              fullWidth
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
              label="Description"
              name="description"
              type="text"
              disabled={formik.isSubmitting}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
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
