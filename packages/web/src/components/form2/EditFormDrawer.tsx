import Overlay from '../common/Overlay';
import Form from './Form';

interface IProps {
  formId: string;
  open: boolean;
  onClose: () => void;
}

export default function EditFormDrawer({ formId, open, onClose }: IProps): any {
  return (
    <Overlay onClose={onClose} open={open} title="Edit form" minWidth="85vw">
      <div className="p-2">
        <Form _id={formId} drawerMode />
      </div>
    </Overlay>
  );
}
