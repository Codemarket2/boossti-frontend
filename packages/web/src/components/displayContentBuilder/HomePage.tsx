import { useState, useEffect } from 'react';
import Layout2 from '../common/Layout2';
import { GET_LIST_ITEM_BY_SLUG } from '@frontend/shared/graphql/query/list';
import { guestClient } from '@frontend/shared/graphql';
import Loading from '../common/Loading';
import NotFound from '../common/NotFound';
import DisplayContentBuilder from './DisplayContentBuilder';
import AuthRequired from '../common/AuthRequired';

export default function Card() {
  const slugName = 'home';

  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getListItemData();
  }, []);

  const getListItemData = async () => {
    try {
      const { data } = await guestClient.query({
        query: GET_LIST_ITEM_BY_SLUG,
        variables: { slug: slugName },
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
    </Layout2>
  );
}
