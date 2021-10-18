import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { GET_LIST_ITEM_BY_SLUG } from '@frontend/shared/graphql/query/list';
import { guestClient } from '@frontend/shared/graphql';
import Loading from '../../src/components/common/Loading';
import FieldValues from '../../src/components/field/FieldValues';

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
  console.log({ payload });
  return (
    <>
      {payload?.getListItemBySlug?.active ? (
        <FieldValues
          parentId={payload?.getListItemBySlug?._id}
          typeId={payload?.getListItemBySlug?.types[0]?._id}
          showPreview={true}
        />
      ) : (
        <p>404 not found</p>
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
