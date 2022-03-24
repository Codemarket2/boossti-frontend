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
import { useGetTemplates } from '@frontend/shared/hooks/template';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader2 from '../common/ListHeader2';
import AddTemplateForm from './AddTemplateForm';
import Overlay from '../common/Overlay';

export default function Templates(): any {
  const { data, loading, error, state, setState } = useGetTemplates();
  const [showOverlay, setShowOverlay] = useState(false);
  const router = useRouter();

  const createCallback = (slug) => {
    router.push(`/${slug}`);
  };

  return (
    <>
      <ListHeader2
        search={state.search}
        onSearchChange={(newSearch) => setState({ ...state, search: newSearch })}
        searchLoading={loading}
        handleAddNew={() => router.push(`/templates/new`)}
        // handleAddNew={() => setShowOverlay(true)}
      >
        <Typography color="textPrimary">Templates</Typography>
      </ListHeader2>
      {showOverlay && (
        <Overlay title="Add new template" open={showOverlay} onClose={() => setShowOverlay(false)}>
          <AddTemplateForm createCallback={createCallback} />
        </Overlay>
      )}
      <Paper variant="outlined">
        {error || !data ? (
          <ErrorLoading error={error} />
        ) : (
          <List dense className="p-0">
            {data.getTemplates.data.map((template, i) => (
              <Fragment key={template._id}>
                {i > 0 && <Divider />}
                <Link href={`/${template.slug}`}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar
                        alt={template.title}
                        src={template.media[0] && template.media[0].url}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={template.title.includes('-n-e-w') ? 'Title' : template.title}
                      secondary={`By ${template.createdBy?.name} ${getCreatedAtDate(
                        template.createdAt,
                      )}`}
                    />
                  </ListItem>
                </Link>
              </Fragment>
            ))}
          </List>
        )}
      </Paper>
    </>
  );
}
