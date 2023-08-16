import { useSelector } from 'react-redux';
import { IAttributes as ISetting } from '@frontend/shared/redux/actions/setting';
import parse from 'html-react-parser';
import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';
import Babessell from '../babessell';

export default function AppDashboard() {
  const { appForm, appResponse } = useSelector((state: { setting: ISetting }) => state?.setting);
  const domain = window.location.host;
  if (
    ['www.babessell.com', 'scrum.boossti.com'].includes(domain) ||
    process.env.NEXT_PUBLIC_APP_DOMAIN === 'babessell.boossti.com'
  ) {
    return <Babessell />;
  }

  const homepageFieldId = appForm?.fields?.find((field) => field?.label === 'Homepage')?._id;

  const homepageResponse = appResponse?.values?.find((value) => value?.field === homepageFieldId)
    ?.response;

  const { data: pagesForm, error, loading } = useGetFormBySlug('pages');

  if (!pagesForm || error) {
    return <ErrorLoading error={error} />;
  }

  const htmlContentFieldId = pagesForm?.getFormBySlug?.fields?.find(
    (field) => field?.label === 'HTML Content',
  )?._id;

  const htmlContentValue = homepageResponse?.values?.find(
    (value) => value?.field === htmlContentFieldId,
  )?.value;

  if (htmlContentValue) {
    return <>{parse(String(htmlContentValue))}</>;
  }

  return <NotFound />;
}
