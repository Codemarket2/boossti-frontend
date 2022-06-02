import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSettingAction } from '../../redux/actions/setting';
import { getFormBySlug } from '../form';

export const useGetUserForm = () => {
  const dispatch = useDispatch();
  const getForm = async () => {
    let userForm = await getFormBySlug('users');
    const emailFieldId = getFieldByLabel('email', userForm?.fields)?._id;
    const firstNameFieldId = getFieldByLabel('First name', userForm?.fields)?._id;
    const lastNameFieldId = getFieldByLabel('Last name', userForm?.fields)?._id;
    userForm = { ...userForm, emailFieldId, firstNameFieldId, lastNameFieldId };
    dispatch(
      updateSettingAction({
        userForm,
      }),
    );
  };
  useEffect(() => {
    getForm();
  }, []);
};

const getFieldByLabel = (label, fields) => {
  return fields?.find((field) => field?.label?.toLowerCase() === label?.toLowerCase());
};

export const getUserAttributes = (userForm, userResponse) => {
  const email = userResponse?.values?.find((v) => v?.field === userForm?.emailFieldId)?.value;
  const firstName = userResponse?.values?.find((v) => v?.field === userForm?.firstNameFieldId)
    ?.value;
  const lastName = userResponse?.values?.find((v) => v?.field === userForm?.lastNameFieldId)?.value;
  return { email, firstName, lastName, _id: userResponse?._id };
};
