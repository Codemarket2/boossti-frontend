import React from 'react';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import { useGetAllUser } from '@frontend/shared/hooks/user';
import Loading from '../common/Loading';
import UserCard from './UserCard';

export default function AlignItemsList() {
  const { allData, handleUpdateUserStatus, filter, setFilter, loading } = useGetAllUser();

  return (
    <>
      <Paper className="mb-4" variant="outlined">
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
        <Paper variant="outlined">
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
