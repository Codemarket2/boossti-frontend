import Overlay from '../common/Overlay';
import { DisplayForm } from '../form2/DisplayForm';

interface IProps {
  open: boolean;
  onClose: () => void;
  formId: string;
  title?: string;
  createCallback: (response: any) => void;
  parentResponseId?: string;
}

export default function CreateResponseDrawer({
  open,
  onClose,
  formId,
  title = '',
  createCallback,
  parentResponseId,
}: IProps): any {
  return (
    <>
      {/* <Overlay open={open} onClose={onClose} title={`Add ${title}`}>
        <div className="p-2">
          <DisplayForm
            _id={formId}
            createCallback={createCallback}
            settings={{ widgetType: 'form' }}
            parentResponseId={parentResponseId}
          />
        </div>
      </Overlay> */}
      <div className="p-2">
        <DisplayForm
          _id={formId}
          createCallback={createCallback}
          settings={{ widgetType: 'form' }}
          parentResponseId={parentResponseId}
        />
      </div>
    </>
  );
}
