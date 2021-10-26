import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GET_LIST_ITEM_BY_SLUG } from '@frontend/shared/graphql/query/list';
import { guestClient } from '@frontend/shared/graphql';
import Loading from '../../src/components/common/Loading';
import NotFound from '../../src/components/common/NotFound';
import DisplayContentBuilder from '../../src/components/displayContentBuilder/DisplayContentBuilder';
import AuthRequired from '../../src/components/common/AuthRequired';
import Layout2 from '../../src/components/common/Layout2';

function Card({ slug }) {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getListItemData();
  }, []);

  const getListItemData = async () => {
    try {
      const { data } = await guestClient.query({
        query: GET_LIST_ITEM_BY_SLUG,
        variables: { slug },
      });
      setPayload(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <Layout2>
      {/* <Navbar /> */}
      {payload?.getListItemBySlug?.active ? (
        <>
          {payload?.getListItemBySlug?.authenticateUser ? (
            <AuthRequired>
              <DisplayContentBuilder
                parentId={payload?.getListItemBySlug?._id}
                typeId={payload?.getListItemBySlug?.types[0]?._id}
              />
            </AuthRequired>
          ) : (
            <DisplayContentBuilder
              parentId={payload?.getListItemBySlug?._id}
              typeId={payload?.getListItemBySlug?.types[0]?._id}
            />
          )}
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <NotFound />
      )}
      {/* <Footer /> */}
    </Layout2>
  );
}
export default function Page() {
  const router = useRouter();
  const { slug } = router.query;

  if (slug) {
    return <Card slug={slug} />;
  }
  return <p>loading</p>;
}
