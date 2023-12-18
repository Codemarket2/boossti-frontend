interface IPayload {
  fields: any[];
  values: any[];
  globalState: any;
}

export const calculateSystemValues = ({ fields = [], values = [], globalState = {} }: IPayload) => {
  let newValues = [...values];

  const systemFields = fields?.filter(
    (field) => field?.options?.systemCalculatedAndSaved && field?.options?.systemValue?._id,
  );
  systemFields?.forEach((field) => {
    let value;
    if (field?.options?.systemValue?.globalState) {
      if (field?.options?.systemValue?._id === 'userName') {
        value = { value: globalState?.auth?.attributes?.name || '' };
      } else if (field?.options?.systemValue?._id === 'userEmail') {
        value = { value: globalState?.auth?.attributes?.email || '' };
      }
    } else {
      value = values?.find((v) => v?.field === field?.options?.systemValue?._id);
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

// const getValueObject = (field, tempValue) => {
//   const value: any = {
//     field: field?._id,
//     value: '',
//   };
//   switch (field?.fieldType) {
//     case 'number':
//     case 'phoneNumber':
//       value.valueNumber = tempValue;
//       break;
//     case 'date':
//     case 'dateTime':
//       value.valueDate = tempValue;
//       break;
//     case 'boolean':
//       value.valueBoolean = tempValue;
//       break;
//     case 'form':
//       value.form = tempValue;
//       break;
//     case 'response':
//       value.response = tempValue;
//       break;
//     default:
//       value.value = tempValue;
//       break;
//   }
//   return value;
// };
