import { useState } from 'react';
import { useMutation } from '@apollo/client';
import produce from 'immer';

import {
  CREATE_LOGO_OR_DESCRIPTION,
  DELETE_LOGO_OR_DESCRIPTION,
  UPDATE_LOGO_OR_DESCRIPTION,
} from '../../graphql/mutation/logo';
import { GET_LOGO_OR_DESCRIPTION } from '../../graphql/query/logo';

export const useCreateLogoOrDescription = () => {
  const [createLogoOrDescription, { loading, data }] = useMutation(CREATE_LOGO_OR_DESCRIPTION);
  console.log(data);
  const handleSave = async (logo?: string, description?: string) => {
    await createLogoOrDescription({
      variables: {
        description,
        logo,
      },
    });
  };
  return {
    handleSave,
    loading,
  };
};
