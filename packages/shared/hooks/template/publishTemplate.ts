import { useMutation } from '@apollo/client';
import { PUBLISH_TEMPLATE } from '../../graphql/mutation/template';
import { GET_TEMPLATE_BY_SLUG } from '../../graphql/query/template';
import { client as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';

export const updateCache = (slug: string, active: boolean) => {
  const oldData = apolloClient.readQuery({
    query: GET_TEMPLATE_BY_SLUG,
    variables: { slug },
  });
  if (oldData?.getTemplateBySlug) {
    const newData = {
      ...oldData,
      getTemplateBySlug: {
        ...oldData?.getTemplateBySlug,
        active,
      },
    };
    apolloClient.writeQuery({
      query: GET_TEMPLATE_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export const usePublishTemplate = ({ onAlert }: IHooksProps) => {
  const [updateMutation] = useMutation(PUBLISH_TEMPLATE);
  const handlePublish = ({
    _id,
    slug,
    active,
    showInMenu = false,
  }: {
    _id: string;
    slug: string;
    active: boolean;
    showInMenu: boolean;
  }) => {
    updateCache(slug, active);
    updateMutation({
      variables: { _id, active, showInMenu },
    }).catch((error) => onAlert('error', error.message));
  };
  return { handlePublish };
};
