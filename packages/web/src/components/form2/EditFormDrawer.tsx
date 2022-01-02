import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Form from './Form';

interface IProps {
  formId: string;
  open: boolean;
  onClose: () => void;
}

export default function EditFormDrawer({ formId, open, onClose }: IProps): any {
  return (
    <Dialog fullScreen open={open}>
      <div className="p-2">
        <Button
          startIcon={<CloseIcon />}
          onClick={onClose}
          size="small"
          color="primary"
          variant="contained"
          className="position-absolute m-2"
          style={{ right: 0 }}
        >
          Close
        </Button>
        <Form _id={formId} drawerMode />
      </div>
    </Dialog>
  );
}
