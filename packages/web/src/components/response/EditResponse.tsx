import { useCreateUpdateResponse } from '@frontend/shared/hooks/response';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import { IForm, IResponse } from '@frontend/shared/types';
import { onAlert } from '../../utils/alert';
import NotFound from '../common/NotFound';
import Overlay from '../common/Overlay';
import { FormViewChild } from '../form2/FormView';

interface IProps {
  form: IForm;
  response: IResponse;
  onClose: () => void;
  open?: boolean;
  overlay?: boolean;
  fieldId?: string;
  valueId?: string;
  editMode?: string;
}

export default function EditResponse({
  fieldId,
  form,
  response,
  open,
  onClose,
  overlay,
  valueId,
  editMode,
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
    const updatedResponse = await handleCreateUpdateResponse({
      payload,
      edit: true,
      fields: form?.fields,
    });
    // onClose();
    return updatedResponse;
  };

  const getFields = () => {
    if (fieldId) {
      return form?.fields
        ?.filter((f) => f?._id === fieldId)
        ?.map((f) => {
          let options: any = f?.options || {};
          if (typeof options === 'string') {
            options = JSON.parse(options);
          }
          options = { ...options, required: true };
          // return { ...f, options };
          return { ...f, options };
        });
    }
    return form?.fields;
  };
  const inlineEdit = Boolean(fieldId);

  const EditComponent = (
    <div>
      {authorized ? (
        <FormViewChild
          inlineEdit={inlineEdit}
          fields={getFields()}
          initialValues={response?.values}
          handleSubmit={handleSubmit}
          loading={updateLoading}
          edit
          formId={form?._id}
          form={form}
          responseId={response?._id}
          onCancel={onClose}
          formView={!inlineEdit && form?.settings?.formView}
          showMessage={(r) => onClose()}
          valueId={valueId}
          editMode={editMode}
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
