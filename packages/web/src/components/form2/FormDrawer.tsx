import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Form from './Form';

interface IProps {
  formId: string;
  open: boolean;
  onClose: () => void;
}

export default function CreateFormDrawer({ formId, open, onClose }: IProps): any {
  return (
    <Drawer anchor="right" open={open}>
      <div style={{ minWidth: '100vw' }} className="p-2">
        <Button
          onClick={onClose}
          size="small"
          color="primary"
          variant="outlined"
          className="position-absolute m-2"
          style={{ right: 0 }}
        >
          Close
        </Button>
        <Form _id={formId} />
      </div>
    </Drawer>
  );
}
