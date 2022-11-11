import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { ADDED_COMMENT2 } from '../../graphql/subscription/comment';
import { FEED_DELETE_SUB } from '../../graphql/subscription/feed';
import { FORM_SUB } from '../../graphql/subscription/form';
import { RESPONSE_SUB2 } from '../../graphql/subscription/response';

interface IUseAuditLogSub {
  refetch: () => void;
}

export const useAuditLogSub = ({ refetch }: IUseAuditLogSub) => {
  const { data: commentData } = useSubscription(ADDED_COMMENT2);
  const { data: responseData } = useSubscription(RESPONSE_SUB2);
  const { data: formData } = useSubscription(FORM_SUB);
  const { data: feedDeleteSubData } = useSubscription(FEED_DELETE_SUB);

  useEffect(() => {
    if (
      refetch &&
      (commentData?.addedComment?._id ||
        responseData?.responseSub?._id ||
        formData?.formSub?._id ||
        feedDeleteSubData?.feedDeleteSub)
    ) {
      refetch();
    }
  }, [commentData, responseData, formData, feedDeleteSubData]);
};
