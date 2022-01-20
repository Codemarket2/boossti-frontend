import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import { useGetListItemsByType, useCreateListItem } from '@frontend/shared/hooks/list';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader from '../common/ListHeader';
import LoadingButton from '../common/LoadingButton';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';

export default function ListItems({ types, slug }: any) {
  const { data, loading, error, state, setState } = useGetListItemsByType({ types });
  const router = useRouter();

  const createCallback = (itemSlug) => {
    router.push(`/types/${slug}/${itemSlug}`);
  };

  const { handleCreate, createLoading } = useCreateListItem({ onAlert });

  return (
    <>
      <ListHeader
        loading={loading}
        buttonClass="justify-content-between flex-row-reverse"
        button={
          <Tooltip title="Add New Types">
            <LoadingButton
              className="ml-2"
              size="small"
              variant="contained"
              color="primary"
              type="button"
              onClick={() => handleCreate(types, createCallback)}
              loading={createLoading}
              startIcon={<AddIcon />}
            >
              Add New
            </LoadingButton>
          </Tooltip>
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
          <List dense>
            {data.getListItems.data.map((lisItem, i) => (
              <Fragment key={lisItem._id}>
                {i > 0 && <Divider />}
                <Link href={`/types/${lisItem.types[0].slug}/${lisItem.slug}`}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt={lisItem.title} src={lisItem.media[0] && lisItem.media[0].url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={lisItem.title.includes('-n-e-w') ? 'Title' : lisItem.title}
                      secondary={`By ${lisItem.createdBy?.name} ${getCreatedAtDate(
                        lisItem.createdAt,
                      )}`}
                    />
                  </ListItem>
                </Link>
              </Fragment>
            ))}
          </List>
        )}
      </Paper>
      <Backdrop open={createLoading} />
    </>
  );
}
