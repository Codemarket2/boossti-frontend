import { useRouter } from 'next/router';
import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { useGetResponseByCount } from '@frontend/shared/hooks/response';
import UserLayout from '../../../../../src/components/common/UserLayout';
import ResponseScreen from '../../../../../src/screens/ResponseScreen';
import HeadComponent from '../../../../../src/components/common/Head';

export default function Page() {
  const router = useRouter();
  const { count, slug } = router.query;
  const { data } = useGetResponseByCount(
    useGetFormBySlug(slug?.toString())?.data?.getFormBySlug?._id,
    Number(count),
  );

  return (
    <>
      {data && (
        <HeadComponent
          title={data?.getResponseByCount.values[0]?.value.replace(/(<([^>]+)>)/gi, '')}
          description={data?.getResponseByCount.values[1]?.value.replace(/(<([^>]+)>)/gi, '')}
          image={data?.getResponseByCount.values[2]?.value
            // eslint-disable-next-line
            ?.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/)
            ?.toString()}
          url=""
        />
      )}
      <UserLayout authRequired={false} container={false} feedLayout>
        {slug && (
          <ResponseScreen
            slug={slug?.toString()}
            count={count?.toString()}
            deleteCallback={(form) => router.push(`/form/${form?.slug}`)}
          />
        )}
      </UserLayout>
    </>
  );
}
