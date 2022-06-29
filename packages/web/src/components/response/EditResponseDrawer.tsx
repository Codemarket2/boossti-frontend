import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import { onAlert } from '../../utils/alert';
import NotFound from '../common/NotFound';
import Overlay from '../common/Overlay';
import { FormView } from '../form2/FormView';

interface IProps {
  form: any;
  response: any;
  open: boolean;
  onClose: () => void;
}

export default function EditResponseDrawer({ form, response, open, onClose }: IProps): any {
  const { handleCreateUpdateResponse, updateLoading } = useCreateUpdateResponse({
    onAlert,
  });
  const authorized = useAuthorization([response?.createdBy?._id, form?.createdBy?._id], true);
  const handleSubmit = async (values: any[]) => {
    const payload = {
      values,
      _id: response?._id,
    };
    await handleCreateUpdateResponse({ payload, edit: true, fields: form?.fields });
    onClose();
  };

  return (
    <Overlay open={open} onClose={onClose} title="Edit Response">
      <div className="p-2">
        {authorized ? (
          <FormView
            fields={form?.fields}
            initialValues={response?.values}
            handleSubmit={handleSubmit}
            loading={updateLoading}
            edit
            formId={form?._id}
            responseId={response?._id}
            onCancel={onClose}
          />
        ) : (
          <NotFound />
        )}
      </div>
    </Overlay>
  );
}
