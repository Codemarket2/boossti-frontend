import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_FORMS, GET_FORM } from '../../graphql/query/form';

interface IProps {
  page?: number;
  limit?: number;
  search?: string;
}

// const defaultQueryVariables = { page: 1, limit: 20, search: '' };

export function useGetForms({
  page = 1,
  limit = 20,
  search = '',
}: IProps): any {
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

export function useGetForm(_id: string): any {
  const [getForm, setGetForm] = useState(null);
  const { data, error, loading } = useQuery(GET_FORM, {
    variables: { _id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data && data.getForm) {
      const parsedForm = {
        ...data.getForm,
        fields: data?.getForm?.fields?.map((m) => {
          const field = { ...m };
          field.options = JSON.parse(field.options);
          return field;
        }),
        settings: JSON.parse(data.getForm.settings),
      };
      setGetForm(parsedForm);
    }
  }, [data]);

  return { data: { getForm }, error, loading };
}
