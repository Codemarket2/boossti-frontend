import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { systemForms } from '@frontend/shared/utils/systemForms';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../../common/Breadcrumbs';
import ErrorLoading from '../../common/ErrorLoading';
import ResponseList from '../../response/ResponseList';

export default function Feeds() {
  const attributes = useSelector((state: any) => state?.auth?.attributes);
  const { data, error } = useGetFormBySlug(systemForms?.feed?.slug);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  const receiverField = data?.getFormBySlug?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.receiver?.toLowerCase(),
  );

  // const linkField = data?.getFormBySlug?.fields?.find(
  //   (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.link?.toLowerCase(),
  // );

  return (
    <div>
      <Breadcrumbs>
        <Typography color="textPrimary">Feed</Typography>
      </Breadcrumbs>
      <ResponseList
        form={data?.getFormBySlug}
        valueFilter={{ 'values.field': receiverField?._id, 'values.response': attributes?._id }}
      />
    </div>
  );
}
