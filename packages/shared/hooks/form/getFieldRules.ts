/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { IField } from '../../types';
import { fieldProps } from '../../utils/fieldProps';
import { systemForms } from '../../utils/systemForms';
import { getResponses } from '../response/getResponse';
import { getFormBySlug } from './getForm';

interface IUseGetFieldRules {
  formId: string;
  fields: IField[];
}

export const useGetFieldRules = ({ fields, formId }: IUseGetFieldRules) => {
  const [init, setInit] = useState(false);
  const [rules, setSetRules] = useState({});
  const [loading, setLoading] = useState(false);

  const getRules = async () => {
    setLoading(true);
    const ruleForm = await getFormBySlug(systemForms?.rules?.slug);
    const rulesFormField = ruleForm?.fields?.find(
      (field) => field?.label?.toLowerCase() === systemForms?.rules?.fields?.field?.toLowerCase(),
    );
    const rulesFormPropsField = ruleForm?.fields?.find(
      (field) => field?.label?.toLowerCase() === systemForms?.rules?.fields?.props?.toLowerCase(),
    );
    const ruleTypeField = ruleForm?.fields?.find(
      (field) =>
        field?.label?.toLowerCase() === systemForms?.rules?.fields?.ruleType?.toLowerCase(),
    );
    const conditionField = ruleForm?.fields?.find(
      (field) =>
        field?.label?.toLowerCase() === systemForms?.rules?.fields?.condition?.toLowerCase(),
    );
    const valueField = ruleForm?.fields?.find(
      (field) => field?.label?.toLowerCase() === systemForms?.rules?.fields?.value?.toLowerCase(),
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
        const rule = {};
        responses?.data?.forEach((response) => {
          const propsFieldValue = response?.values?.find(
            (value) => value?.field === rulesFormPropsField?._id,
          );
          if (propsFieldValue?._id && fieldProps.includes(propsFieldValue?.value)) {
            const ruleTypeValue = response?.values?.find(
              (value) => value?.field === ruleTypeField?._id,
            )?.value;
            let conditionValue = response?.values?.find(
              (value) => value?.field === conditionField?._id,
            )?.options;
            if (conditionValue) {
              conditionValue = JSON.parse(conditionValue)?.conditions;
            }
            let propValue = response?.values?.find((value) => value?.field === valueField?._id)
              ?.options;
            if (propValue) {
              propValue = JSON.parse(propValue)?.conditions[0]?.right;
            }
            rule[propsFieldValue?.value] = {
              prop: propsFieldValue?.value,
              ruleType: ruleTypeValue,
              condition: conditionValue,
              value: propValue,
            };
          }
        });
        tempRules[field?._id] = rule;
      }
    }
    setSetRules(tempRules);
    setLoading(false);
  };

  useEffect(() => {
    if (!init && fields?.length > 0 && process.env.NODE_ENV !== 'test') {
      setInit(true);
      getRules();
    }
  }, [fields]);

  return { rules, loading };
};
