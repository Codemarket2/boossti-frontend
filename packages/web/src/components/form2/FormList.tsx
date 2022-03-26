/* eslint-disable react/jsx-wrap-multilines */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useGetForms } from '@frontend/shared/hooks/form';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader2 from '../common/ListHeader2';

export default function FormList(): any {
  const { data, error, loading, state, setState } = useGetForms({});
  const router = useRouter();

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
