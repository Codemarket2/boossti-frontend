interface IPayload {
  fields: any[];
  values: any[];
  globalState: any;
}

export const calculateSystemValues = ({ fields = [], values = [], globalState = {} }: IPayload) => {
  let newValues = [...values];

  const systemFields = fields?.filter(
    (field) => field?.options?.systemCalculatedAndSaved && field?.options?.systemValue?.fieldId,
  );
  systemFields?.forEach((field) => {
    let value;
    if (field?.options?.systemValue?.globalState) {
      if (field?.options?.systemValue?.fieldId === 'userName') {
        value = { value: globalState?.auth?.attributes?.name || '' };
      } else if (field?.options?.systemValue?.fieldId === 'userEmail') {
        value = { value: globalState?.auth?.attributes?.email || '' };
      }
    } else {
      value = values?.find((v) => v?.field === field?.options?.systemValue?.fieldId);
    }
    if (value) {
      let isPresent = false;
      newValues = values?.map((v) => {
        if (v?.field === field?._id) {
          isPresent = true;
          return { ...value, _id: v?._id, field: field._id };
        }
        return v;
      });
      if (!isPresent) {
        newValues = [...values, { ...value, field: field._id }];
      }
    }
  });
  return newValues;
};
