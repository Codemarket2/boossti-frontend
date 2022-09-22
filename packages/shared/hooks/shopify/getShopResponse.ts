import { getForm } from '../form/getForm';
import { getResponses } from '../response/getResponse';
import { appProperties } from './appProperties';

interface IProps {
  formId: string;
  shop: string;
}

export const getShopResponse = async ({ formId, shop }: IProps) => {
  const form = await getForm(formId);
  const formField = form?.fields?.find(
    (field) =>
      field?.label?.toLowerCase() ===
      appProperties.favoriteFormFields.storeUrl?.toLocaleLowerCase(),
  )?._id;
  const responses = await getResponses({ formId, formField });
  return responses?.data[0];
};
