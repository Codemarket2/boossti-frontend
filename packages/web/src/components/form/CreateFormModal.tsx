import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CreateForm from './CreateForm';

interface IProps {
  parentId: string;
  open: boolean;
  onClose: () => void;
}

export default function CreateFormDrawer({ parentId, open, onClose }: IProps) {
  return (
    <Dialog fullScreen open={open}>
      <div className="p-2">
        <Button
          onClick={onClose}
          size="small"
          color="primary"
          variant="outlined"
          className="position-absolute m-3"
        >
          Close
        </Button>
        <CreateForm parentId={parentId} />
      </div>
    </Dialog>
  );
}
