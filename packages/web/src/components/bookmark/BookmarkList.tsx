import { useGetMyBookmarks } from '@frontend/shared/hooks/boomark';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorLoading from '../common/ErrorLoading';
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
      <Paper
        className="my-2 py-1 d-flex justify-content-end align-items-center"
        variant="outlined"
        style={{ minHeight: 55 }}
      >
        {bookmarkState.showSearch ? (
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" role="button">
                  <IconButton
                    className="mr-n3"
                    onClick={() =>
                      bookmarkSetState({ ...bookmarkState, search: '', showSearch: false })
                    }
                    size="large"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={bookmarkState.search}
            onChange={({ target: { value } }) =>
              bookmarkSetState({ ...bookmarkState, search: value })
            }
          />
        ) : (
          <IconButton
            onClick={() => bookmarkSetState({ ...bookmarkState, search: '', showSearch: true })}
            size="large"
          >
            <SearchIcon />
          </IconButton>
        )}
      </Paper>
      {error || !data || !data.getMyBookmarks ? (
        <ErrorLoading error={error} />
      ) : (
        <>
          {data.getMyBookmarks.data.map((bookmark) => (
            <Card
              variant="outlined"
              key={bookmark._id}
              className="my-2 d-flex justify-content-between align-content-center"
            >
              <CardContent>
                <Chip role="button" color="primary" label={bookmark.bookmark} />
                <Typography>{moment(bookmark.createdAt).fromNow()}</Typography>
              </CardContent>
              <CardContent>
                <IconButton
                  onClick={(event) =>
                    bookmarkSetState({
                      ...bookmarkState,
                      showMenu: event.currentTarget,
                      selectedBookmark: bookmark,
                    })
                  }
                  size="large"
                >
                  <MoreVertIcon />
                </IconButton>
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
        }
      >
        <MenuItem
          onClick={async () => {
            await handleDeleteBookmark();
            alert('Bookmark deleted!');
          }}
        >
          <ListItemIcon className="mr-n3">
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </div>
  );
}
