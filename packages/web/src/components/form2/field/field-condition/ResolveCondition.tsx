import { ICondition, IForm, IResponse } from '@frontend/shared/types';
import { getValue } from './DisplayFieldCondition';

interface IResolveCondition {
  conditions: ICondition[];
  forms: { [key: string]: IForm };
  responses: { [key: string]: IResponse };
  leftPartResponse: Partial<IResponse>;
  authState: any;
  permission: any;
}

export const resolveCondition = ({
  forms,
  responses,
  conditions,
  leftPartResponse,
  authState,
  permission,
}: IResolveCondition) => {
  let result = false;
  conditions.forEach((condition) => {
    if (condition.left?.formId === leftPartResponse?.formId) {
      const leftValue = getLeftPartValue({
        conditionPart: condition.left,
        forms,
        responses: { ...responses, [leftPartResponse?._id]: leftPartResponse },
      });
      const rightValue = getRightPartValue({
        conditionPart: { ...condition.right },
        forms,
        responses: { ...responses, [leftPartResponse?._id]: leftPartResponse },
        authState,
      });
      if (![leftValue, rightValue].includes(undefined))
        if (condition?.conditionType === '==') {
          result = leftValue === rightValue;
        } else if (condition?.conditionType === '!=') {
          result = leftValue !== rightValue;
        }
    } else if (condition.left?.formId === 'auth' && permission === 'view') {
      if (condition?.conditionType === '!=' && authState && authState.authenticated) {
        result = authState.authenticated !== condition.right?.value;
      }
    }
  });
  return result;
};

const getLeftPartValue = ({ conditionPart, forms, responses }) => {
  let value;
  let response;
  Object.keys(responses).forEach((key) => {
    if (responses[key]?.formId === conditionPart?.formId) {
      response = responses[key];
    }
  });
  const form = forms?.[conditionPart?.formId];
  const field = form?.fields?.find((f) => f?._id === conditionPart?.fieldId);
  const fieldValue = response?.values?.find((v) => v?.field === conditionPart?.fieldId);

  if (field?._id && fieldValue) {
    value = getValue(field, fieldValue);
  }
  return value;
};

const getRightPartValue = ({ conditionPart, forms, responses, authState }) => {
  let rightValue;
  if (conditionPart?.value && conditionPart?.value?.includes('auth.')) {
    if (conditionPart?.value === 'auth._id') {
      rightValue = authState?.attributes?.[`custom:_id`];
    } else if (conditionPart?.value === 'auth.name') {
      rightValue = authState?.attributes?.name;
    } else if (conditionPart?.value === 'auth.email') {
      rightValue = authState?.attributes?.email;
    }
  } else if (conditionPart?.value === 'constantValue' && conditionPart?.constantValue) {
    rightValue = conditionPart?.constantValue;
  } else if (
    conditionPart?.value === 'form' &&
    conditionPart?.formId &&
    conditionPart?.fieldId &&
    conditionPart?.responseId
  ) {
    const form = forms?.[conditionPart?.formId];
    const response = responses?.[conditionPart?.responseId];
    const field = form?.fields?.find((f) => f?._id === conditionPart?.fieldId);
    const fieldValue = response?.values?.find((v) => v?.field === conditionPart?.fieldId);
    if (field?._id && fieldValue) {
      rightValue = getValue(field, fieldValue);
    }
  }
  return rightValue;
};
