import Overlay from '../common/Overlay';
import FormViewWrapper from '../form2/FormViewWrapper';

interface IProps {
  open: boolean;
  onClose: () => void;
  formId: string;
  parentId?: string;
  title?: string;
  createCallback: (response: any) => void;
}

export default function CreateResponseDrawer({
  open,
  onClose,
  formId,
  parentId,
  title = '',
  createCallback,
}: IProps): any {
  return (
    <Overlay open={open} onClose={onClose} title={`Create new ${title}`}>
      <div className="p-2">
        <FormViewWrapper
          formId={formId}
          parentId={parentId}
          createCallback={createCallback}
          customSettings={null}
        />
      </div>
    </Overlay>
  );
}
