import { useMutation } from '@apollo/client';
import { PUBLISH_PAGE } from '../../graphql/mutation/template';
import { GET_PAGE_BY_SLUG } from '../../graphql/query/template';
import { client as apolloClient } from '../../graphql';

export const updateCache = (slug: string, active: boolean, authenticateUser: boolean) => {
  const oldData = apolloClient.readQuery({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  if (oldData?.getPageBySlug) {
    const newData = {
      ...oldData,
      getPageBySlug: {
        ...oldData?.getPageBySlug,
        active,
        authenticateUser,
      },
    };
    apolloClient.writeQuery({
      query: GET_PAGE_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export const usePublishPage = () => {
  const [updateMutation] = useMutation(PUBLISH_PAGE);
  const handlePublish = (_id: string, slug: string, active: boolean, authenticateUser: boolean) => {
    updateCache(slug, active, authenticateUser);
    updateMutation({
      variables: { _id, active, authenticateUser },
    });
  };
  return { handlePublish };
};
