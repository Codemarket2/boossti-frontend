import { useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { UPDATED_FORM } from '../../graphql/subscription/form';
import { GET_FORMS, GET_FORM } from '../../graphql/query/form';

interface IProps {
  page?: number;
  limit?: number;
  search?: string;
}

// const defaultQueryVariables = { page: 1, limit: 20, search: '' };

export function useGetForms({ page = 1, limit = 20, search = '' }: IProps): any {
  const [state, setState] = useState({
    page: 1,
    limit: 20,
    search: '',
    showSearch: false,
  });

  const { data, error, loading } = useQuery(GET_FORMS, {
    variables: { ...state },
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading, state, setState };
}

export const parseForm = (form) => {
  const parsedForm = {
    ...form,
    fields: form?.fields?.map((m) => {
      const field = { ...m };
      field.options = JSON.parse(field.options);
      return field;
    }),
    settings: JSON.parse(form?.settings),
  };
  return parsedForm;
};

export function useGetForm(_id: string): any {
  const [getForm, setGetForm] = useState(null);
  const { data, error, loading } = useQuery(GET_FORM, {
    variables: { _id },
  });

  const { data: subscriptionData } = useSubscription(UPDATED_FORM, {
    variables: { _id },
  });

  useEffect(() => {
    if (subscriptionData?.updatedForm) {
      const parsedForm = parseForm(subscriptionData?.updatedForm);
      setGetForm({ ...getForm, ...parsedForm });
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (data && data.getForm) {
      setGetForm(parseForm(data.getForm));
    }
  }, [data]);

  return { data: { getForm }, error, loading };
}
