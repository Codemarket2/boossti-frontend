import { useGetForm } from '@frontend/shared/hooks/form';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  _id: string;
  parentId?: string;
  createCallback?: (response: any) => void;
  customSettings: any;
}

export default function FieldViewWrapper({
  _id,
  parentId,
  createCallback,
  customSettings,
}: IProps): any {
  const { error, data } = useGetForm(_id);

  if (error?.message?.includes("has coerced Null value for NonNull type 'ID!'")) {
    return null;
  }

  if (error || !data || !data.getForm) {
    return <ErrorLoading error={error} />;
  }

  return (
    <FormView
      form={{ ...data.getForm, settings: customSettings ? customSettings : data.getForm.settings }}
      parentId={parentId}
      createCallback={createCallback}
    />
  );
}
