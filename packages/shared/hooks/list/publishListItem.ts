import { useMutation } from '@apollo/client';
import { PUBLISH_LIST_ITEM } from '../../graphql/mutation/list';
import { GET_LIST_ITEM_BY_SLUG } from '../../graphql/query/list';
import { client as apolloClient } from '../../graphql';

export const updateCache = (slug: string, active: boolean, authenticateUser: boolean) => {
  const oldData = apolloClient.readQuery({
    query: GET_LIST_ITEM_BY_SLUG,
    variables: { slug },
  });

  if (oldData?.getListItemBySlug) {
    const newData = {
      ...oldData,
      getListItemBySlug: {
        ...oldData?.getListItemBySlug,
        active,
        authenticateUser,
      },
    };
    apolloClient.writeQuery({
      query: GET_LIST_ITEM_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export const usePublishListItem = () => {
  const [updateMutation] = useMutation(PUBLISH_LIST_ITEM);
  const handlePublish = (_id: string, slug: string, active: boolean, authenticateUser: boolean) => {
    updateCache(slug, active, authenticateUser);
    updateMutation({
      variables: { _id, active, authenticateUser },
    });
  };
  return { handlePublish };
};
