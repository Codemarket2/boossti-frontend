import { useGetMyBookmarks } from '@frontend/shared/hooks/boomark';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearIcon from '@material-ui/icons/Clear';
import ErrorLoading from '../common/ErrorLoading';
import Loading from '../common/Loading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';

export default function BookmarkList() {
  const {
    data,
    error,
    loading,
    state: bookmarkState,
    setState: bookmarkSetState,
    handleDeleteBookmark,
    deleteBookmarkLoading,
  } = useGetMyBookmarks({ onAlert });

  return (
    <div>
      <Backdrop open={deleteBookmarkLoading} />
      <Paper className="my-2">
        <TextField
          fullWidth
          variant="outlined"
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" role="button">
                {bookmarkState.search ? (
                  <ClearIcon onClick={() => bookmarkSetState({ ...bookmarkState, search: '' })} />
                ) : (
                  <>
                    {bookmarkState.search && loading && (
                      <CircularProgress size={25} className="mr-3" />
                    )}
                    <SearchIcon />
                  </>
                )}
              </InputAdornment>
            ),
          }}
          value={bookmarkState.search}
          onChange={({ target: { value } }) =>
            bookmarkSetState({ ...bookmarkState, search: value })
          }
        />
      </Paper>
      {error || !data || !data.getMyBookmarks ? (
        <ErrorLoading error={error} />
      ) : (
        <>
          {loading && <Loading />}
          {data.getMyBookmarks.data.map((bookmark) => (
            <Card
              key={bookmark._id}
              className="my-2 d-flex justify-content-between align-content-center">
              <CardContent>
                <Chip role="button" color="primary" label={bookmark.bookmark} />
                <Typography>{moment(bookmark.createdAt).fromNow()}</Typography>
              </CardContent>
              <CardContent>
                <MoreVertIcon
                  onClick={(event) =>
                    bookmarkSetState({
                      ...bookmarkState,
                      showMenu: event.currentTarget,
                      selectedBookmark: bookmark,
                    })
                  }
                />
              </CardContent>
            </Card>
          ))}
        </>
      )}
      <Menu
        anchorEl={bookmarkState.showMenu}
        keepMounted
        open={Boolean(bookmarkState.showMenu)}
        onClose={() =>
          bookmarkSetState({ ...bookmarkState, showMenu: null, selectedBookmark: null })
        }>
        <MenuItem
          onClick={async () => {
            await handleDeleteBookmark();
            alert('Bookmark deleted!');
          }}>
          <ListItemIcon className="mr-n4">
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </div>
  );
}
