import { useSelector } from 'react-redux';
import { IAttributes as ISetting } from '@frontend/shared/redux/actions/setting';
import parse from 'html-react-parser';
import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import AppLayout from './AppLayout';

export default function AppDashboard() {
  // const setting = useSelector((state: { setting: ISetting }) => state.setting);
  const { appForm, appResponse } = useSelector((state: { setting: ISetting }) => state?.setting);

  const homepageFieldId = appForm?.fields?.find((field) => field?.label === 'Homepage')?._id;

  // console.log(homepageFieldId);
  const homepageResponse = appResponse?.values?.find((value) => value?.field === homepageFieldId)
    ?.response;
  const { data: pagesForm, error, loading } = useGetFormBySlug('pages');
  // console.log(pagesForm);
  const htmlContentFieldId = pagesForm?.getFormBySlug?.fields?.find(
    (field) => field?.label === 'HTML Content',
  )?._id;
  const htmlContentValue = homepageResponse?.values?.find(
    (value) => value?.field === htmlContentFieldId,
  )?.value;
  // console.log(homepageResponse);
  return (
    <div>
      {/* <AppLayout>Dashboard</AppLayout>
       */}
      {!loading ? parse(String(htmlContentValue)) : <>loading</>}
    </div>
  );
}
