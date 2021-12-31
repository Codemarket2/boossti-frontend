/* eslint-disable react/jsx-wrap-multilines */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetForms, useCreateForm } from '@frontend/shared/hooks/form';
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
import Backdrop from '../common/Backdrop';
import Breadcrumbs from '../common/Breadcrumbs';
import { onAlert } from '../../utils/alert';

export default function FormList(): any {
  const { data, error, loading, state, setState } = useGetForms({});
  const { handleCreateForm, createLoading } = useCreateForm({ onAlert });
  const router = useRouter();

  const handleAddNewForm = async () => {
    const res = await handleCreateForm(`Form ${Math.floor(1000 + Math.random() * 9000)}`);
    router.push(`/forms/${res?.data?.createForm?._id}`);
  };

  return (
    <div>
      <Breadcrumbs>
        <Typography>Forms</Typography>
      </Breadcrumbs>
      <Backdrop open={createLoading} />
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
              onClick={handleAddNewForm}
              loading={createLoading}
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
                  {console.log(form._id)}
                  <ListItemText
                    primary={form.name}
                    secondary={`${form.createdBy?.name} ${moment(form.createdAt) > moment().subtract(7, 'days')
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
