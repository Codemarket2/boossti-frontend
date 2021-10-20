import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { GET_LIST_ITEM_BY_SLUG } from '@frontend/shared/graphql/query/list';
import { guestClient } from '@frontend/shared/graphql';
import Loading from '../../src/components/common/Loading';
import NotFound from '../../src/components/common/NotFound';
import DisplayContentBuilder from '../../src/components/displayContentBuilder/DisplayContentBuilder';

function Card({ slug }) {
  const [payload, setPayload] = useState(null);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {payload?.getListItemBySlug?.active ? (
        <DisplayContentBuilder
          parentId={payload?.getListItemBySlug?._id}
          typeId={payload?.getListItemBySlug?.types[0]?._id}
        />
      ) : (
        <NotFound />
      )}
    </>
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
