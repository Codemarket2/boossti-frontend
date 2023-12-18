import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettingAction } from '../../redux/actions/setting';
import { IHooksProps } from '../../types';
import { systemForms } from '../../utils/systemForms';
import { getFormBySlug } from '../form';
import { useCreateUpdateResponse } from '../response';

export const useInstallApp = ({ onAlert }: IHooksProps) => {
  const globalState = useSelector((state: any) => state);
  const [installLoading, setInstallLoading] = useState(false);
  const dispatch = useDispatch();
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });

  const handleInstall = async () => {
    try {
      setInstallLoading(true);
      const appUsersForm = await getFormBySlug(systemForms?.appUsers?.slug);
      if (!appUsersForm?._id) throw new Error('App User form not found.');
      const userField = appUsersForm?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.appUsers?.fields?.user,
      );
      const appField = appUsersForm?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.appUsers?.fields?.app,
      );
      const statusField = appUsersForm?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.appUsers?.fields?.status,
      );
      const payload = {
        formId: appUsersForm?._id,
        values: [
          {
            ...defaultValue,
            field: userField?._id,
            response: { _id: globalState?.auth?.attributes?.['custom:_id'] },
          },
          {
            ...defaultValue,
            field: appField?._id,
            response: globalState?.setting?.appResponse,
          },
          // {
          //   ...defaultValue,
          //   field: statusField?._id,
          //   value: 'accepted',
          // },
        ],
      };
      // const response = await handleCreateUpdateResponse({
      //   payload,
      //   fields: appUsersForm?.fields,
      // });
      throw new Error('Implementation Not completed yet');
      setInstallLoading(false);
      dispatch(updateSettingAction({ isInstalled: true }));
    } catch (error) {
      setInstallLoading(false);
      alert(`Error while installing the app, ${error?.message}`);
    }
  };

  return { handleInstall, installLoading };
};

const defaultValue = {
  // field: '',
  value: '',
  // valueNumber: null,
  // valueBoolean: null,
  // valueDate: null,
  // media: [],
  values: [],
  // template: null,
  // page: null,
  // form: null,
  // response: null,
  // options: { option: false },
};
