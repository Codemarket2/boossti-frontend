import { useGetForm } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';
import Overlay from '../common/Overlay';
import Form from './Form';

interface IProps {
  formId: string;
  open: boolean;
  onClose: () => void;
}

export default function EditFormDrawer({ formId, open, onClose }: IProps): any {
  const { data, error } = useGetForm(formId);
  return (
    <Overlay onClose={onClose} open={open} title="Edit form" minWidth="85vw">
      <div className="p-2">
        {error || !data ? <ErrorLoading error={error} /> : <Form form={data?.getForm} drawerMode />}
      </div>
    </Overlay>
  );
}
