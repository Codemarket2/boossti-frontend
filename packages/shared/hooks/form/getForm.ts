import { useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FORM_SUB, UPDATED_FORM } from '../../graphql/subscription/form';
import { client as apolloClient, guestClient } from '../../graphql';
import {
  GET_FORMS,
  GET_FORM,
  GET_FORM_BY_SLUG,
  GET_FORM_RELATIONS,
  GET_FORM_TAB_RELATIONS,
} from '../../graphql/query/form';
import { IForm } from '../../types';

interface IProps {
  page?: number;
  limit?: number;
}

export function useGetForms({ page = 1, limit = 10 }: IProps) {
  const [state, setState] = useState({
    page,
    limit,
    search: '',
    showSearch: false,
  });
  const [subscribed, setSubscribed] = useState(false);

  const { data, error, loading, subscribeToMore } = useQuery<
    { getForms: { data: IForm[]; count: number } },
    { page: number; limit: number; search: string }
  >(GET_FORMS, {
    variables: { ...state },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    let unsubscribe = () => null;
    if (!subscribed) {
      setSubscribed(true);
      unsubscribe = subscribeToMore<{ formSub: IForm }>({
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
          if (isNew && prev?.getForms?.data?.length > 0) {
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
  const [form, setForm] = useState<IForm>(null);
  const { data, error, loading, refetch } = useQuery<{ getForm: IForm }, { _id: string }>(
    GET_FORM,
    {
      variables: { _id },
      // nextFetchPolicy: 'cache-and-network',
    },
  );

  useSubscription(UPDATED_FORM, {
    variables: { _id },
  });

  useEffect(() => {
    if (data && data.getForm) {
      setForm(parseForm(data.getForm));
    }
  }, [data]);

  return { data: form ? { getForm: form } : null, error, loading, refetch };
}

export function useGetFormRelations(_id: string) {
  const [forms, setForms] = useState<IForm[]>(null);
  const { data, error, loading } = useQuery<{ getFormRelations: IForm[] }, { _id: string }>(
    GET_FORM_RELATIONS,
    {
      variables: { _id },
      nextFetchPolicy: 'cache-and-network',
    },
  );

  useEffect(() => {
    if (data && data.getFormRelations) {
      setForms(data.getFormRelations?.map((form) => parseForm(form)));
    }
  }, [data]);

  return { data: forms ? { getFormRelations: forms } : null, error, loading };
}

export function useGetFormTabRelations(_id: string) {
  const [forms, setForms] = useState<IForm[]>(null);
  const { data, error, loading } = useQuery<{ getFormTabRelations: IForm[] }, { _id: string }>(
    GET_FORM_TAB_RELATIONS,
    {
      variables: { _id },
      nextFetchPolicy: 'cache-and-network',
    },
  );

  useEffect(() => {
    if (data && data.getFormTabRelations) {
      setForms(data.getFormTabRelations?.map((form) => parseForm(form)));
    }
  }, [data]);

  return { data: forms ? { getFormTabRelations: forms } : null, error, loading };
}

export function useGetFormBySlug(slug: string) {
  const [getFormBySlug2, setGetFormBySlug] = useState<IForm>(null);
  const { data, error, loading } = useQuery<{ getFormBySlug: IForm }, { slug: string }>(
    GET_FORM_BY_SLUG,
    {
      variables: { slug },
    },
  );

  useSubscription(UPDATED_FORM, {
    variables: { _id: getFormBySlug2?._id },
  });

  useEffect(() => {
    if (data?.getFormBySlug) {
      setGetFormBySlug(parseForm(data.getFormBySlug));
    }
  }, [data]);

  return { data: getFormBySlug2 ? { getFormBySlug: getFormBySlug2 } : null, error, loading };
}

export async function getForm(_id: string) {
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
  let form: IForm = null;
  const response = await guestClient.query({
    query: GET_FORM_BY_SLUG,
    variables: { slug },
  });
  form = parseForm(response?.data?.getFormBySlug);
  return form;
}
