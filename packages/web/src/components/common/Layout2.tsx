import { useState, useEffect, ReactNode } from 'react';
import { GET_LIST_ITEM_BY_SLUG } from '@frontend/shared/graphql/query/list';
import { guestClient } from '@frontend/shared/graphql';
// import Loading from './Loading';
import DisplayContentBuilder from '../displayContentBuilder/DisplayContentBuilder';

export function Section({ slug }) {
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
      setLoading(false);
    }
  };

  return (
    <>
      {payload?.getListItemBySlug ? (
        <DisplayContentBuilder
          parentId={payload?.getListItemBySlug?._id}
          typeId={payload?.getListItemBySlug?.types[0]?._id}
        />
      ) : null}
    </>
  );
}

interface IProps {
  children: ReactNode;
}

export default function Layout2({ children }: IProps) {
  return (
    <div>
      <Section slug="menu" />
      {children}
      <Section slug="footer" />
    </div>
  );
}
