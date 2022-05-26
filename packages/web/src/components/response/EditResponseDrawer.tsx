import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import { onAlert } from '../../utils/alert';
import Authorization from '../common/Authorization';
import Overlay from '../common/Overlay';
import { FormView } from '../form2/FormView';

interface IProps {
  form: any;
  response: any;
  open: boolean;
  onClose: () => void;
}

export default function EditResponseDrawer({ form, response, open, onClose }: IProps): any {
  const { handleCreateUpdateResponse, updateLoading } = useCreateUpdateResponse({ onAlert });

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
        <Authorization _id={[response?.createdBy?._id, form?.createdBy?._id]} allowAdmin>
          <FormView
            fields={form?.fields}
            initialValues={response?.values}
            handleSubmit={handleSubmit}
            loading={updateLoading}
            edit
            formId={form?._id}
            responseId={response?._id}
          />
        </Authorization>
      </div>
    </Overlay>
  );
}
