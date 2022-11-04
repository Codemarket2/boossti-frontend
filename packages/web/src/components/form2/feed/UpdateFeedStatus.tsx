import { useUpdateFeedStatus } from '@frontend/shared/hooks/feed/updateFeedStatus';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { onAlert } from '../../../utils/alert';

interface IUpdateFeedStatus {
  feedId: string;
}

export default function UpdateFeedStatus({ feedId }: IUpdateFeedStatus) {
  const router = useRouter();
  const callback = useCallback(() => {
    if (router?.query?.feedId) {
      delete router?.query?.feedId;
      router.push(router);
    }
  }, [router]);
  useUpdateFeedStatus({ feedId, onAlert, callback });

  return null;
}
