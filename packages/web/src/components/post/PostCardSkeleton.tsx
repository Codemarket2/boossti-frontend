import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

export default function PostCardSkeleton() {
  return (
    <Paper className="my-2 p-3" variant="outlined">
      <div className="d-flex mb-2">
        <Skeleton variant="circular" width={50} height={50} className="mr-2" />
        <Skeleton variant="text" width={100} />
      </div>
      <Skeleton variant="rectangular" height={118} />
    </Paper>
  );
}
