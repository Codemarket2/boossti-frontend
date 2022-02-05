import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Link from 'next/link';
import ListItem from '@material-ui/core/ListItem';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { useGetListTypes, useCreateListType } from '@frontend/shared/hooks/list';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import ListHeader2 from '../common/ListHeader2';

export default function ListTypes(): any {
  const { data, loading, error, state, setState } = useGetListTypes();
  const [showBackdrop, setShowBackdrop] = useState(false);

  const router = useRouter();
  const { handleCreate, createLoading } = useCreateListType({ onAlert });

  const createCallback = (slug) => {
    setShowBackdrop(true);
    router.push(`/${slug}`);
  };

  return (
    <>
      <ListHeader2
        search={state.search}
        onSearchChange={(newSearch) => setState({ ...state, search: newSearch })}
        searchLoading={loading}
        handleAddNew={() => handleCreate(createCallback)}
        addNewLoading={createLoading}
      >
        <Typography color="textPrimary">Templates</Typography>
      </ListHeader2>
      <Paper variant="outlined">
        {error || !data ? (
          <ErrorLoading error={error} />
        ) : (
          <List dense>
            {data.getListTypes.data.map((listType, i) => (
              <Fragment key={listType._id}>
                {i > 0 && <Divider />}
                <Link href={`/${listType.slug}`}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar
                        alt={listType.title}
                        src={listType.media[0] && listType.media[0].url}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={listType.title.includes('-n-e-w') ? 'Title' : listType.title}
                      secondary={`By ${listType.createdBy?.name} ${getCreatedAtDate(
                        listType.createdAt,
                      )}`}
                    />
                  </ListItem>
                </Link>
              </Fragment>
            ))}
          </List>
        )}
      </Paper>
      <Backdrop open={createLoading || showBackdrop} />
    </>
  );
}
