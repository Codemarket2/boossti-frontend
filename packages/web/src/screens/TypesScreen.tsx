import Typography from '@material-ui/core/Typography';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ListTypes from '../components/list/ListTypes';

export default function FeedsScreen() {
  return (
    <UserLayout authRequired>
      <Breadcrumbs>
        <Typography color="textPrimary">Templates</Typography>
      </Breadcrumbs>
      <ListTypes />
    </UserLayout>
  );
}
