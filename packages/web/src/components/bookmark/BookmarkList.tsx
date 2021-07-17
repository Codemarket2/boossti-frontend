import ErrorLoading from '../common/ErrorLoading';
import { useGetMyBookmarks } from '@frontend/shared/hooks/boomark';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

export default function BookmarkList() {
  const { data, error, loading } = useGetMyBookmarks();

  if (error || !data || !data.getMyBookmarks) {
    return <ErrorLoading error={error} loading={loading} />;
  }
  return (
    <div>
      {data.getMyBookmarks.data.map((bookmark) => (
        <Card key={bookmark._id}>
          <CardContent>
            <Chip role="button" color="primary" label={bookmark.bookmark} />
            <Typography>{moment(bookmark.createdAt).fromNow()}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
