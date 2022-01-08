import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import { onAlert } from '../../utils/alert';
import Overlay from '../common/Overlay';
import { FormView } from './FormView';

interface IProps {
  form: any;
  response: any;
  open: boolean;
  onClose: () => void;
}

export default function EditResponseDrawer({ form, response, open, onClose }: IProps): any {
  const { handleCreateUpdateResponse, updateLoading } = useCreateUpdateResponse({ onAlert }, null);

  const handleSubmit = async (values: any[]) => {
    const payload = {
      values,
      _id: response?._id,
    };
    await handleCreateUpdateResponse(payload, form?.fields, true);
    onClose();
  };

  return (
    <Overlay open={open} onClose={onClose} title="Edit Response">
      <div className="p-2">
        <FormView
          fields={form?.fields}
          initialValues={response?.values}
          handleSubmit={handleSubmit}
          loading={updateLoading}
        />
      </div>
    </Overlay>
  );
}
