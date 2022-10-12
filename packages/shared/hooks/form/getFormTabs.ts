import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_FORM_ALL_TABS } from '../../graphql/query/form';
import { IForm } from '../../types';
import { parseForm } from './getForm';

export const useGetFormTabs = (formId: string) => {
  const [formAllTabs, setFormAllTabs] = useState([]);
  const { data, error, loading } = useQuery<{ getFormAllTabs: IForm[] }>(GET_FORM_ALL_TABS, {
    variables: { formId },
  });

  useEffect(() => {
    if (data) {
      const newTabs = [];
      data?.getFormAllTabs?.forEach((tForm) => {
        const form = parseForm(tForm);
        form?.settings?.tabs?.forEach((tab) => {
          if (tab?.options?.addToAllForms) newTabs.push({ ...tab, parentForm: tForm });
        });
      });
      setFormAllTabs(newTabs);
    }
  }, [data]);

  return { data, error, loading, formAllTabs };
};
