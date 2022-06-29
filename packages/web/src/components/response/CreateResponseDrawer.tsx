import Overlay from '../common/Overlay';
import { DisplayForm } from '../form2/DisplayForm';

interface IProps {
  open: boolean;
  onClose: () => void;
  formId: string;
  title?: string;
  createCallback: (response: any) => void;
  installId?: string;
}

export default function CreateResponseDrawer({
  open,
  onClose,
  formId,
  title = '',
  createCallback,
  installId,
}: IProps): any {
  return (
    <Overlay open={open} onClose={onClose} title={`Create new ${title}`}>
      <div className="p-2">
        <DisplayForm
          _id={formId}
          createCallback={createCallback}
          installId={installId}
          settings={{ widgetType: 'form' }}
        />
      </div>
    </Overlay>
  );
}
