/* eslint-disable react/jsx-wrap-multilines */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useGetForms, useCreateForm } from '@frontend/shared/hooks/form';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import ListHeader2 from '../common/ListHeader2';

export default function FormList(): any {
  const { data, error, loading, state, setState } = useGetForms({});
  const { handleCreateForm, createLoading } = useCreateForm({ onAlert });
  const router = useRouter();
  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleAddNewForm = async () => {
    const res = await handleCreateForm(`Form ${Math.floor(1000 + Math.random() * 9000)}`);
    setShowBackdrop(true);
    router.push(`/forms/${res?.data?.createForm?._id}`);
  };

  return (
    <>
      <ListHeader2
        search={state.search}
        onSearchChange={(newSearch) => setState({ ...state, search: newSearch })}
        searchLoading={loading}
        handleAddNew={() => handleAddNewForm}
        addNewLoading={createLoading}
      >
        <Typography color="textPrimary">Forms</Typography>
        <Backdrop open={createLoading || showBackdrop} />
      </ListHeader2>
      <Paper variant="outlined">
        {error || !data || !data.getForms ? (
          <ErrorLoading error={error} />
        ) : (
          <List dense>
            {data.getForms.data.map((form, i) => (
              <Fragment key={form._id}>
                {i > 0 && <Divider />}
                <Link href={`/forms/${form._id}`}>
                  <ListItem button>
                    <ListItemText
                      primary={form.name}
                      secondary={`${form.createdBy?.name} ${getCreatedAtDate(form.createdAt)}`}
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
