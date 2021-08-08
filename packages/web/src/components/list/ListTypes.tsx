import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Link from 'next/link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { useGetListTypes, useCRUDListTypes } from '@frontend/shared/hooks/list';
import Backdrop from '../common/Backdrop';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader from '../common/ListHeader';
// import ListTypeForm from './ListTypeForm';
// import CRUDMenu from '../common/CRUDMenu';
// import { onAlert } from '../../utils/alert';

export default function ListTypes() {
  const { data, loading, error, state, setState } = useGetListTypes();
  // const {
  //   state,
  //   setState,
  //   listTypeFormik,
  //   handleShowForm,
  //   handleDelete,
  //   CRUDLoading,
  // } = useCRUDListTypes({
  //   onAlert,
  // });
  return (
    <>
      {/* <Backdrop open={CRUDLoading || listTypeFormik.isSubmitting} /> */}
      <ListHeader
        button={
          <Link href="/types/new">
            <Tooltip title="Add New Types">
              <Button
                className="ml-2"
                size="small"
                variant="contained"
                component="span"
                color="primary"
                startIcon={<AddIcon />}>
                Add New
              </Button>
            </Tooltip>
          </Link>
        }
        search={state.search}
        showSearch={state.showSearch}
        onHide={() => setState({ ...state, search: '', showSearch: false })}
        onShow={() => setState({ ...state, search: '', showSearch: true })}
        onChange={(value) => setState({ ...state, search: value })}>
        <Typography variant="h4">Types</Typography>
      </ListHeader>
      <Paper variant="outlined">
        {error || !data ? (
          <ErrorLoading error={error} />
        ) : (
          <List>
            {data.getListTypes.data.map((t, i) => (
              <>
                {i > 0 && <Divider />}
                <Link href={`types/${t.slug}`}>
                  <ListItem button key={t._id}>
                    <ListItemAvatar>
                      <Avatar alt={t.title} src={t.media[0] && t.media[0].url} />
                    </ListItemAvatar>
                    <ListItemText primary={t.name} secondary={t.description} />
                    {/* <ListItemSecondaryAction>
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
                  </ListItemSecondaryAction> */}
                  </ListItem>
                </Link>
              </>
            ))}
          </List>
        )}
      </Paper>
      {/* <ListTypeForm
        open={state.showForm}
        onClose={() => setState({ ...state, showForm: false })}
        formik={listTypeFormik}
        state={state}
        setState={setState}
      /> */}
      {/* <CRUDMenu
        show={state.showCRUDMenu}
        onClose={() => setState({ ...state, showCRUDMenu: null, selectedListType: null })}
        onEdit={() => handleShowForm(true)}
        onDelete={handleDelete}
      /> */}
    </>
  );
}
