import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { IHooksProps } from '../../types/common';
import { client as apolloClient } from '../../graphql';
import { GET_LIST_ITEM_BY_SLUG } from '../../graphql/query/list';
import { UPDATE_LIST_ITEM_LAYOUTS } from '../../graphql/mutation/list';

interface IProps extends IHooksProps {
  _id: string;
  slug: string;
  layouts: any;
}

export function useUpdateItemLayout({ onAlert, slug, layouts, _id }: IProps) {
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_LIST_ITEM_LAYOUTS);

  useEffect(() => {
    let timeOutId;
    if (layouts) {
      timeOutId = setTimeout(() => {
        updateMutation({
          variables: { _id, layouts: JSON.stringify(layouts) },
        }).catch((error) => onAlert('Error', error.message));
      }, 1000);
    }
    return () => clearTimeout(timeOutId);
  }, [layouts]);

  const handleUpdateLayout = async (newLayouts) => {
    try {
      const data = await apolloClient.readQuery({
        query: GET_LIST_ITEM_BY_SLUG,
        variables: { slug },
      });
      if (data && data?.getListItemBySlug) {
        const { getListItemBySlug } = data;
        const newData = {
          getListItemBySlug: {
            ...getListItemBySlug,
            layouts: JSON.stringify(newLayouts),
          },
        };
        apolloClient.writeQuery({
          query: GET_LIST_ITEM_BY_SLUG,
          variables: { slug },
          data: newData,
        });
      }
    } catch (error) {
      console.log('Error', error);
      onAlert('Error', error.message);
    }
  };
  return { handleUpdateLayout };
}
