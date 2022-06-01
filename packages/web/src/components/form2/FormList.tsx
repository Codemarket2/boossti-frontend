/* eslint-disable react/jsx-wrap-multilines */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useGetForms } from '@frontend/shared/hooks/form';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import { getUserAttributes } from '@frontend/shared/hooks/user/getUserForm';
import { useSelector } from 'react-redux';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader2 from '../common/ListHeader2';

export default function FormList(): any {
  const { data, error, loading, state, setState } = useGetForms({});
  const router = useRouter();

  const userForm = useSelector(({ setting }: any) => setting.userForm);

  return (
    <>
      <ListHeader2
        search={state.search}
        onSearchChange={(newSearch) => setState({ ...state, search: newSearch })}
        searchLoading={loading}
        handleAddNew={() => router.push(`/forms/new`)}
      >
        <Typography color="textPrimary">Forms</Typography>
      </ListHeader2>
      <Paper variant="outlined">
        {error || !data || !data.getForms ? (
          <ErrorLoading error={error} />
        ) : (
          <List dense className="p-0">
            {data.getForms.data.map((form, i) => (
              <Fragment key={form._id}>
                {i > 0 && <Divider />}
                <Link href={`/forms/${form.slug}`}>
                  <ListItem button>
                    <ListItemText
                      primary={form.name}
                      secondary={`${getUserAttributes(userForm, form.createdBy)?.firstName} ${
                        getUserAttributes(userForm, form.createdBy)?.lastName
                      } ${getCreatedAtDate(form.createdAt)}`}
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
