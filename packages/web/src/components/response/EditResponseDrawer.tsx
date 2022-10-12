import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import { onAlert } from '../../utils/alert';
import NotFound from '../common/NotFound';
import Overlay from '../common/Overlay';
import { FormView } from '../form2/FormView';

interface IProps {
  form: any;
  response: any;
  onClose: () => void;
  open?: boolean;
  overlay?: boolean;
  fieldId?: string;
}

export default function EditResponseDrawer({
  fieldId,
  form,
  response,
  open,
  onClose,
  overlay,
}: IProps): any {
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

  const getFields = () => {
    if (fieldId) {
      return form?.fields
        ?.filter((f) => f?._id === fieldId)
        ?.map((f) => {
          let options = f?.options || {};
          if (typeof options === 'string') {
            options = JSON.parse(options);
          }
          options = { ...options, required: true };
          return { ...f, options };
        });
    }
    return form?.fields;
  };

  const EditComponent = (
    <div>
      {authorized ? (
        <FormView
          inlineEdit={Boolean(fieldId)}
          fields={getFields()}
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
  );

  return (
    <>
      {overlay ? (
        <Overlay
          open={open}
          onClose={() => {
            const anwser = confirm('Are you sure you want to close?');
            if (anwser) {
              onClose();
            }
          }}
          title="Edit Response"
        >
          <div className="p-2">{EditComponent}</div>
        </Overlay>
      ) : (
        EditComponent
      )}
    </>
  );
}
