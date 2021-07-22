import Skeleton from '@material-ui/lab/Skeleton';

export default function UserProfileCardSkeleton() {
  return (
    <div className="my-2 p-3 d-flex flex-column align-items-center">
      <Skeleton variant="circle" width={250} height={250} className="mb-2" />
      <Skeleton variant="rect" height={20} width={300} />
    </div>
  );
}
