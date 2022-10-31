/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { IField } from '../../types';
import { systemForms } from '../../utils/systemForms';
import { getResponses } from '../response/getResponse';
import { getFormBySlug } from './getForm';

interface IUseGetFieldRules {
  formId: string;
  fields: IField[];
}

export const useGetFieldRules = ({ fields, formId }: IUseGetFieldRules) => {
  const [rules, setSetRules] = useState({});
  const [loading, setLoading] = useState(false);

  const getRules = async () => {
    setLoading(true);
    const ruleForm = await getFormBySlug(systemForms?.rules?.slug);
    const rulesFormField = ruleForm?.fields?.find(
      (field) => field?.label?.toLowerCase() === systemForms?.rules?.fields?.field?.toLowerCase(),
    );
    const tempRules = {};
    for (const field of fields) {
      const responses = await getResponses({
        formId: ruleForm?._id,
        valueFilter: JSON.stringify({
          'values.field': rulesFormField?._id,
          'values.form': formId,
          'values.options.subField.fieldId': field?._id,
        }),
      });
      if (responses?.data?.length > 0) {
        tempRules[field?._id] = responses?.data;
      }
    }
    setSetRules(tempRules);
    setLoading(false);
  };

  useEffect(() => {
    getRules();
  }, []);

  return { rules, loading };
};
