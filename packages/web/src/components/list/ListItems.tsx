import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import { useGetListItemsByType } from '@frontend/shared/hooks/list';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader from '../common/ListHeader';

export default function ListItems({ types, name, slug }: any) {
  const { data, loading, error, state, setState } = useGetListItemsByType({ types });

  return (
    <>
      <ListHeader
        buttonClass="justify-content-between flex-row-reverse"
        button={
          <Link href={`/types/${slug}/new`}>
            <Tooltip title="Add New Types">
              <Button
                className="ml-2"
                size="small"
                variant="contained"
                component="span"
                color="primary"
                startIcon={<AddIcon />}>
                Add New
              </Button>
            </Tooltip>
          </Link>
        }
        search={state.search}
        showSearch={state.showSearch}
        onHide={() => setState({ ...state, search: '', showSearch: false })}
        onShow={() => setState({ ...state, search: '', showSearch: true })}
        onChange={(value) => setState({ ...state, search: value })}
      />
      <Paper variant="outlined">
        {error || !data ? (
          <ErrorLoading error={error} />
        ) : (
          <List>
            {data.getListItems.data.map((t, i) => (
              <>
                {i > 0 && <Divider />}
                <Link href={`/types/${t.types[0].slug}/${t.slug}`}>
                  <ListItem button key={t._id}>
                    <ListItemAvatar>
                      <Avatar alt={t.title} src={t.media[0] && t.media[0].url} />
                    </ListItemAvatar>
                    <ListItemText primary={t.title} secondary={t.description} />
                  </ListItem>
                </Link>
              </>
            ))}
          </List>
        )}
      </Paper>
    </>
  );
}
