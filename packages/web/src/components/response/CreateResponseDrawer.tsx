import Overlay from '../common/Overlay';
import { FormPageById } from '../form2/FormPage';

interface IProps {
  open: boolean;
  onClose: () => void;
  formId: string;
  title?: string;
  createCallback: (response: any) => void;
  templateDefaultWidgetResponseId?: string;
}

export default function CreateResponseDrawer({
  open,
  onClose,
  formId,
  title = '',
  createCallback,
  templateDefaultWidgetResponseId,
}: IProps): any {
  return (
    <Overlay open={open} onClose={onClose} title={`Create new ${title}`}>
      <div className="p-2">
        <FormPageById
          _id={formId}
          createCallback={createCallback}
          templateDefaultWidgetResponseId={templateDefaultWidgetResponseId}
          settings={{ widgetType: 'form' }}
        />
      </div>
    </Overlay>
  );
}
