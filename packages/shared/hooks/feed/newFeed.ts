import { useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ADDED_COMMENT2 } from '../../graphql/subscription/comment';
import { IForm, IResponse } from '../../types';
import { systemForms } from '../../utils/systemForms';

interface IUseNewFeed {
  refetch: () => void;
  count: number;
  feedResponses: IResponse[];
  feedForm: IForm;
}

export const useNewFeed = ({ refetch, count, feedResponses, feedForm }: IUseNewFeed) => {
  const [oldCount, setOldCount] = useState(null);
  const [newFeed, setNewFeed] = useState(null);
  const { data } = useSubscription(ADDED_COMMENT2);
  const attributes = useSelector((state: any) => state?.auth?.attributes);
  const [audio] = useState(typeof Audio !== 'undefined' && new Audio('/notification.mp3'));

  useEffect(() => {
    if (
      data?.addedComment?._id &&
      data?.addedComment?.createdBy?._id !== attributes?.['custom:_id']
    ) {
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (oldCount === null && count) {
      setOldCount(count);
    } else if (count && oldCount < count) {
      setOldCount(count);
      audio?.play();
      const feedResponse = feedResponses?.[0];
      const messageField = feedForm?.fields?.find(
        (field) =>
          field?.label?.toLowerCase() === systemForms?.feed?.fields?.message?.toLowerCase(),
      );
      const messageValue = feedResponse?.values?.find((value) => value?.field === messageField?._id)
        ?.value;

      const linkField = feedForm?.fields?.find(
        (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.link?.toLowerCase(),
      );
      const linkValue = feedResponse?.values?.find((value) => value?.field === linkField?._id)
        ?.value;
      setNewFeed({
        createdAt: feedResponse?.createdAt,
        message: messageValue,
        link: linkValue,
        _id: feedResponse?._id,
      });
    }
  }, [count]);

  return { newFeed, setNewFeed };
};
