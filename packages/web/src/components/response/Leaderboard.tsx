import { useEffect, useState } from 'react';
import { useGetResponses } from '@frontend/shared/hooks/response';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  formId: any;
  parentId?: string;
  settings?: any;
}

export default function Leaderboard({ formId, parentId, settings }: IProps): any {
  const { data, error } = useGetResponses({ formId, parentId });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (data?.getResponses?.count) {
      let newProgress = 0;
      if (!settings?.minValue) {
        newProgress = 0;
      } else {
        newProgress = (data?.getResponses?.count / settings?.minValue) * 100;
      }
      setProgress(newProgress);
    }
  }, [data?.getResponses?.count, settings?.minValue]);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="w-100">
          <LinearProgress variant="determinate" value={progress} />
        </div>
        <Typography variant="body2">{`${progress?.toFixed()}%`}</Typography>
      </div>
    </>
  );
}
