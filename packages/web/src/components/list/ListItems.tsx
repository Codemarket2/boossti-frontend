import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import { useGetListItems, useCRUDListItems } from '@frontend/shared/hooks/list';
import Backdrop from '../common/Backdrop';
import ErrorLoading from '../common/ErrorLoading';
import ListItemForm from './ListItemForm';
import CRUDMenu from '../common/CRUDMenu';
import { onAlert } from '../../utils/alert';

export default function ListItems() {
  const { data, loading, error } = useGetListItems();
  const {
    state,
    setState,
    listItemFormik,
    handleShowForm,
    handleDelete,
    CRUDLoading,
  } = useCRUDListItems({
    onAlert,
  });
  return (
    <>
      <Backdrop open={CRUDLoading} />
      <Paper variant="outlined">
        <div className="px-3 py-1 d-flex justify-content-between align-items-center">
          <Typography variant="h5">List Items</Typography>
          <div>
            <Tooltip title="Add New Item">
              <IconButton edge="end" onClick={() => handleShowForm()}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Divider />
        {error || !data ? (
          <ErrorLoading error={error} />
        ) : (
          <List>
            {data.getListItems.data.map((t, i) => (
              <>
                {i > 0 && <Divider />}
                <ListItem key={t._id}>
                  <ListItemAvatar>
                    <Avatar alt={t.title} src={t.media[0] && t.media[0].url} />
                  </ListItemAvatar>
                  <ListItemText primary={t.title} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(event) =>
                        setState({
                          ...state,
                          showCRUDMenu: event.currentTarget,
                          selectedListItem: t,
                        })
                      }>
                      <MoreHorizIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </>
            ))}
          </List>
        )}
      </Paper>
      <ListItemForm
        state={state}
        setState={setState}
        open={state.showForm}
        onClose={() => setState({ ...state, showForm: false })}
        formik={listItemFormik}
        handleChangeTypes={(value) => listItemFormik.setFieldValue('types', value, false)}
      />
      <CRUDMenu
        show={state.showCRUDMenu}
        onClose={() => setState({ ...state, showCRUDMenu: null, selectedListItem: null })}
        onEdit={() => handleShowForm(true)}
        onDelete={handleDelete}
      />
    </>
  );
}
