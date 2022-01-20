import { useUpdateFieldValue, useCreateFieldValue } from '@frontend/shared/hooks/field';
import { SelectFormDrawer } from '../form2/SelectForm';

interface IProps {
  open: boolean;
  formData: any;
  parentId: string;
  field: string;
  onClose: () => void;
}

export default function SelectFormSection({
  open,
  parentId,
  formData,
  field,
  onClose,
}: IProps): any {
  const { handleUpdateField, updateFieldValueLoading } = useUpdateFieldValue();
  const { handleCreateField, createLoading } = useCreateFieldValue();

  const onSelect = async (formId: string) => {
    if (formData?.getFieldValues?.data[0]) {
      const payload = {
        ...formData?.getFieldValues?.data[0],
        value: formId,
      };
      await handleUpdateField(payload);
    } else {
      const payload = {
        parentId,
        field,
        value: formId,
      };
      await handleCreateField(payload);
    }
    onClose();
  };

  return (
    <SelectFormDrawer
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      loading={createLoading || updateFieldValueLoading}
    />
  );
}
