import Overlay from '../common/Overlay';
import FieldViewWrapper from '../form2/FieldViewWrapper';

interface IProps {
  open: boolean;
  onClose: () => void;
  formId: string;
  title?: string;
  createCallback: (response: any) => void;
}

export default function CreateResponseDrawer({
  open,
  onClose,
  formId,
  title = '',
  createCallback,
}: IProps): any {
  return (
    <Overlay open={open} onClose={onClose} title={`Create new ${title}`}>
      <div className="p-2">
        <FieldViewWrapper _id={formId} createCallback={createCallback} customSettings={null} />
      </div>
    </Overlay>
  );
}
