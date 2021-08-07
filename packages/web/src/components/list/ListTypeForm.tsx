import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import LoadingButton from '../common/LoadingButton';

interface IProps {
  open: boolean;
  onClose: () => void;
  formik: any;
  disabled?: boolean;
}
export default function ListForm({ open, onClose, formik, disabled = false }: IProps) {
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
