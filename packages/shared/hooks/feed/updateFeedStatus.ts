import { useEffect, useState } from 'react';
import { IHooksProps } from '../../types';
import { systemForms } from '../../utils/systemForms';
import { useGetFormBySlug } from '../form';
import { useCreateUpdateResponse, useGetResponse } from '../response';

interface IUseUpdateFeedStatus extends IHooksProps {
  feedId: any;
  callback: () => void;
}

export const useUpdateFeedStatus = ({ feedId, onAlert, callback }: IUseUpdateFeedStatus) => {
  const { data: feedFormData } = useGetFormBySlug(systemForms?.feed?.slug);
  const { data: feedResponseData } = useGetResponse(feedId);
  const [disabled, setDisabled] = useState(false);
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });
  useEffect(() => {
    if (!disabled && feedFormData?.getFormBySlug?._id && feedResponseData?.getResponse?._id) {
      handleUpdateStatus();
    }
  }, [feedResponseData?.getResponse?._id, feedFormData?.getFormBySlug?._id]);

  const handleUpdateStatus = async () => {
    try {
      setDisabled(true);
      const statusField = feedFormData?.getFormBySlug?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.status?.toLowerCase(),
      );
      const statusValue = feedResponseData?.getResponse?.values?.find(
        (value) => value?.field === statusField?._id,
      )?.value;
      if (statusValue?.toLowerCase() === 'unread') {
        const newValues = feedResponseData?.getResponse?.values?.map((value) =>
          value?.field === statusField?._id ? { ...value, value: 'read' } : value,
        );
        await handleCreateUpdateResponse({
          edit: true,
          payload: { ...feedResponseData?.getResponse, values: newValues },
          fields: feedFormData?.getFormBySlug?.fields,
        });
      }
      if (callback) {
        callback();
      }
    } catch (error) {
      // onAlert("")
    }
  };
};
