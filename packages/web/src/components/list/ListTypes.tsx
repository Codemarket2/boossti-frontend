import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import Link from 'next/link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { useGetListTypes, useCreateListType } from '@frontend/shared/hooks/list';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader from '../common/ListHeader';
import LoadingButton from '../common/LoadingButton';
import Backdrop from '../common/Backdrop';
import { useRouter } from 'next/router';
import { onAlert } from '../../utils/alert';

export default function ListTypes() {
  const { data, loading, error, state, setState } = useGetListTypes();
  const router = useRouter();
  const createCallback = (slug) => {
    router.push(`/types/${slug}`);
  };
  const { handleCreate, createLoading } = useCreateListType({ onAlert });

  return (
    <>
      <ListHeader
        loading={loading}
        button={
          <Link href="/types/new">
            <Tooltip title="Add New Types">
              <LoadingButton
                className="ml-2"
                size="small"
                variant="contained"
                type="button"
                color="primary"
                onClick={() => handleCreate(createCallback)}
                loading={createLoading}
                startIcon={<AddIcon />}>
                Add New
              </LoadingButton>
            </Tooltip>
          </Link>
        }
        search={state.search}
        showSearch={state.showSearch}
        onHide={() => setState({ ...state, search: '', showSearch: false })}
        onShow={() => setState({ ...state, search: '', showSearch: true })}
        onChange={(value) => setState({ ...state, search: value })}>
        <Typography variant="h4">Types</Typography>
      </ListHeader>
      <Paper variant="outlined">
        {error || !data ? (
          <ErrorLoading error={error} />
        ) : (
          <List>
            {data.getListTypes.data.map((t, i) => (
              <>
                {i > 0 && <Divider />}
                <Link href={`types/${t.slug}`}>
                  <ListItem button key={t._id}>
                    <ListItemAvatar>
                      <Avatar alt={t.title} src={t.media[0] && t.media[0].url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={t.title.includes('-n-e-w') ? 'Title' : t.title}
                      // secondary={t.description}
                    />
                  </ListItem>
                </Link>
              </>
            ))}
          </List>
        )}
      </Paper>
      <Backdrop open={createLoading} />
    </>
  );
}
