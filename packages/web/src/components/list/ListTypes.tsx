import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import { useGetListTypes, useCRUDListTypes } from '@frontend/shared/hooks/list';
import Backdrop from '../common/Backdrop';
import ErrorLoading from '../common/ErrorLoading';
import ListTypeForm from './ListTypeForm';
import CRUDMenu from '../common/CRUDMenu';
import { onAlert } from '../../utils/alert';

export default function ListTypes() {
  const { data, loading, error } = useGetListTypes();
  const {
    state,
    setState,
    listTypeFormik,
    handleShowForm,
    handleDelete,
    CRUDLoading,
  } = useCRUDListTypes({
    onAlert,
  });
  return (
    <>
      <Backdrop open={CRUDLoading} />
      <Paper variant="outlined">
        <div className="px-3 py-1 d-flex justify-content-between align-items-center">
          <Typography variant="h5">List Types</Typography>
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
            {data.getListTypes.data.map((t, i) => (
              <>
                {i > 0 && <Divider />}
                <ListItem key={t._id}>
                  <ListItemText primary={t.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(event) =>
                        setState({
                          ...state,
                          showCRUDMenu: event.currentTarget,
                          selectedListType: t,
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
      <ListTypeForm
        open={state.showForm}
        onClose={() => setState({ ...state, showForm: false })}
        formik={listTypeFormik}
      />
      <CRUDMenu
        show={state.showCRUDMenu}
        onClose={() => setState({ ...state, showCRUDMenu: null, selectedListType: null })}
        onEdit={() => handleShowForm(true)}
        onDelete={handleDelete}
      />
    </>
  );
}
