import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

export default function PostCardSkeleton() {
  return (
    <Paper className="my-2 p-3" variant="outlined">
      <Skeleton variant="text" width={100} height={50} />
      <Skeleton variant="rect" height={50} className="my-2" />
      <Skeleton variant="rect" height={50} />
    </Paper>
  );
}
