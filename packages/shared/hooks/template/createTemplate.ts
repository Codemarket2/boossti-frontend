import { useMutation } from '@apollo/client';
import { CREATE_TEMPLATE } from '../../graphql/mutation/template';
import { IHooksProps } from '../../types/common';
import { stringifyPayload } from '../section/updateSection';

export function useCreateTemplate({ onAlert }: IHooksProps) {
  const [createTemplateMutation, { loading: createLoading }] = useMutation(CREATE_TEMPLATE);
  const handleCreate = async (template, onSuccess, onFailure) => {
    try {
      const payload = stringifyPayload(template, true);
      const res = await createTemplateMutation({
        variables: payload,
      });
      if (onSuccess) {
        onSuccess(res.data.createTemplate.slug);
      }
    } catch (error) {
      onAlert('Error', error.message);
      onFailure();
    }
  };
  return { handleCreate, createLoading };
}
