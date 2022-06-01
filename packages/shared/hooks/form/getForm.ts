import { useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FORM_SUB, UPDATED_FORM } from '../../graphql/subscription/form';
import { client as apolloClient } from '../../graphql';
import { GET_FORMS, GET_FORM, GET_FORM_BY_SLUG } from '../../graphql/query/form';

interface IProps {
  page?: number;
  limit?: number;
  // search?: string;
}

// const defaultQueryVariables = { page: 1, limit: 20, search: '' };

export function useGetForms({ page = 1, limit = 20 }: IProps) {
  const [state, setState] = useState({
    page,
    limit,
    search: '',
    showSearch: false,
  });
  const [subscribed, setSubscribed] = useState(false);

  const { data, error, loading, subscribeToMore } = useQuery(GET_FORMS, {
    variables: { ...state },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    let unsubscribe = () => null;
    if (!subscribed) {
      setSubscribed(true);
      unsubscribe = subscribeToMore({
        document: FORM_SUB,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newForm = subscriptionData.data.formSub;
          let isNew = true;
          let newData = prev?.getForms?.data?.map((t) => {
            if (t._id === newForm._id) {
              isNew = false;
              return newForm;
            }
            return t;
          });
          if (isNew) {
            newData = [...prev?.getForms?.data, newForm];
          }
          return {
            ...prev,
            getForms: {
              ...prev.getForms,
              data: newData,
            },
          };
        },
      });
    }
    return () => unsubscribe();
  }, []);

  return { data, error, loading, state, setState };
}

export const parseForm = (form) => {
  const parsedForm = {
    ...form,
  };
  if (form?.fields) {
    parsedForm.fields = form?.fields?.map((m) => {
      const field = { ...m };
      field.options = JSON.parse(field.options);
      return field;
    });
  }
  if (form?.settings) {
    parsedForm.settings = JSON.parse(form?.settings);
  }
  return parsedForm;
};

export function useGetForm(_id: string) {
  const [form, setForm] = useState(null);
  const { data, error, loading } = useQuery(GET_FORM, {
    variables: { _id },
  });

  const { data: subscriptionData } = useSubscription(UPDATED_FORM, {
    variables: { _id },
  });

  useEffect(() => {
    if (subscriptionData?.updatedForm) {
      const parsedForm = parseForm(subscriptionData?.updatedForm);
      setForm({ ...form, ...parsedForm });
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (data && data.getForm) {
      setForm(parseForm(data.getForm));
    }
  }, [data]);

  return { data: form ? { getForm: form } : null, error, loading };
}

export function useGetFormBySlug(slug: string): any {
  const [getFormBySlug2, setGetFormBySlug] = useState(null);
  const { data, error, loading } = useQuery(GET_FORM_BY_SLUG, {
    variables: { slug },
  });

  useEffect(() => {
    if (data?.getFormBySlug) {
      setGetFormBySlug(parseForm(data.getFormBySlug));
    }
  }, [data]);

  return { data: getFormBySlug2 ? { getFormBySlug: getFormBySlug2 } : null, error, loading };
}

export async function getForm(_id) {
  let form = null;
  try {
    const response = await apolloClient.query({
      query: GET_FORM,
      variables: { _id },
    });
    form = parseForm(response?.data?.getForm);
  } catch (error) {
    // console.log({ error });
  }
  return form;
}

export async function getFormBySlug(slug: string) {
  let form = null;
  const response = await apolloClient.query({
    query: GET_FORM_BY_SLUG,
    variables: { slug },
  });
  form = parseForm(response?.data?.getFormBySlug);
  return form;
}
