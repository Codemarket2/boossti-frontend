import { useMutation } from '@apollo/client';
import { PUBLISH_LIST_TYPE } from '../../graphql/mutation/list';
import { GET_LIST_TYPE_BY_SLUG } from '../../graphql/query/list';
import { client as apolloClient } from '../../graphql';

export const updateCache = (slug: string, active: boolean) => {
  const oldData = apolloClient.readQuery({
    query: GET_LIST_TYPE_BY_SLUG,
    variables: { slug },
  });
  if (oldData?.getListTypeBySlug) {
    const newData = {
      ...oldData,
      getListTypeBySlug: {
        ...oldData?.getListTypeBySlug,
        active,
      },
    };
    apolloClient.writeQuery({
      query: GET_LIST_TYPE_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export const usePublishListType = () => {
  const [updateMutation] = useMutation(PUBLISH_LIST_TYPE);
  const handlePublish = (_id: string, slug: string, active: boolean) => {
    updateCache(slug, active);
    updateMutation({
      variables: { _id, active },
    });
  };
  return { handlePublish };
};
