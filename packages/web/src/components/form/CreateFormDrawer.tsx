import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CreateForm from './CreateForm';

interface IProps {
  parentId: string;
  open: boolean;
  onClose: () => void;
}

export default function CreateFormDrawer({ parentId, open, onClose }: IProps) {
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
        <CreateForm parentId={parentId} />
      </div>
    </Drawer>
  );
}
