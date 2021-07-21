import React from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearIcon from '@material-ui/icons/Clear';
import { useGetAllUser } from '@frontend/shared/hooks/user';
import Loading from '../common/Loading';
import UserCard from './UserCard';

export default function AlignItemsList() {
  const { allData, handleUpdateUserStatus, filter, setFilter, loading } = useGetAllUser();

  return (
    <>
      <Paper className="mb-4">
        <TextField
          fullWidth
          variant="outlined"
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" role="button">
                {filter.search ? (
                  <ClearIcon onClick={() => setFilter({ ...filter, search: '' })} />
                ) : (
                  <>
                    {filter.search && loading && <CircularProgress size={25} className="mr-3" />}
                    <SearchIcon />
                  </>
                )}
              </InputAdornment>
            ),
          }}
          value={filter.search}
          onChange={({ target: { value } }) => setFilter({ ...filter, search: value })}
        />
      </Paper>
      {loading ? (
        <Loading />
      ) : (
        <Paper>
          <List className="py-0">
            {allData.users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                handleUpdateUserStatus={handleUpdateUserStatus}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}
