import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CreateForm from './CreateForm';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateFormDrawer({ open, onClose }: IProps) {
  return (
    <Drawer anchor="right" open={open}>
      <div style={{ width: '75vw' }} className="p-2">
        <Button
          onClick={onClose}
          size="small"
          color="primary"
          variant="outlined"
          className="position-absolute m-3">
          Close
        </Button>
        <CreateForm parentId="6187c0932baaf1000917bf3b" />
      </div>
    </Drawer>
  );
}
