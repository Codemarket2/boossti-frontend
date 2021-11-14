/* eslint-disable react/jsx-wrap-multilines */
import Link from 'next/link';
import { useGetForms } from '@frontend/shared/hooks/form';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader from '../common/ListHeader';
import LoadingButton from '../common/LoadingButton';

export default function FormList(): any {
  const { data, error, loading, state, setState } = useGetForms({});

  return (
    <div>
      <ListHeader
        loading={loading}
        button={
          <Link href="/types/new">
            <LoadingButton
              className="ml-2"
              size="small"
              variant="contained"
              type="button"
              color="primary"
              // onClick={() => handleCreate(createCallback)}
              // loading={createLoading}
              startIcon={<AddIcon />}
            >
              Add New
            </LoadingButton>
          </Link>
        }
        search={state.search}
        showSearch={state.showSearch}
        onHide={() => setState({ ...state, search: '', showSearch: false })}
        onShow={() => setState({ ...state, search: '', showSearch: true })}
        onChange={(value) => setState({ ...state, search: value })}
      >
        <Typography variant="h4">Forms</Typography>
      </ListHeader>
      <Paper variant="outlined">
        {error || !data || !data.getForms ? (
          <ErrorLoading error={error} />
        ) : (
          <List>
            {data.getForms.data.map((form) => (
              <Link href={`/forms/${form._id}`}>
                <ListItem button key={form._id}>
                  <ListItemText
                    primary={form.name}
                    secondary={`${form.createdBy.name} ${
                      moment(form.createdAt) > moment().subtract(7, 'days')
                        ? moment(form.createdAt).fromNow()
                        : moment(form.createdAt).format('LL')
                    }`}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        )}
      </Paper>
    </div>
  );
}
