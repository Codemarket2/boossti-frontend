import Overlay from '../common/Overlay';
import FormViewWrapper from '../form2/FormViewWrapper';

interface IProps {
  open: boolean;
  onClose: () => void;
  formId: string;
  title?: string;
  createCallback: (response: any) => void;
  templateInstanceId?: string;
}

export default function CreateResponseDrawer({
  open,
  onClose,
  formId,
  title = '',
  createCallback,
  templateInstanceId,
}: IProps): any {
  return (
    <Overlay open={open} onClose={onClose} title={`Create new ${title}`}>
      <div className="p-2">
        <FormViewWrapper
          formId={formId}
          createCallback={createCallback}
          customSettings={null}
          templateInstanceId={templateInstanceId}
        />
      </div>
    </Overlay>
  );
}
