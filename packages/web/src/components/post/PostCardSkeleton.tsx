import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

export default function PostCardSkeleton() {
  return (
    <Paper className="my-2 p-3" variant="outlined">
      <div className="d-flex mb-2">
        <Skeleton variant="circle" width={50} height={50} className="mr-2" />
        <Skeleton variant="text" width={100} />
      </div>
      <Skeleton variant="rect" height={118} />
    </Paper>
  );
}
