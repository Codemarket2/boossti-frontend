import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import { useGetListItemsByType, useCRUDListItems } from '@frontend/shared/hooks/list';
import Backdrop from '../common/Backdrop';
import ErrorLoading from '../common/ErrorLoading';
import ListItemForm from './ListItemForm';
import CRUDMenu from '../common/CRUDMenu';
import ListHeader from '../common/ListHeader';
import { onAlert } from '../../utils/alert';

export default function ListItems({ types, name, slug }: any) {
  const { data, loading, error, state, setState } = useGetListItemsByType({ types });
  // const {
  //   state,
  //   setState,
  //   listItemFormik,
  //   handleShowForm,
  //   handleDelete,
  //   CRUDLoading,
  // } = useCRUDListItems({
  //   onAlert,
  // });
  return (
    <>
      <ListHeader
        button={
          <Link href={`/types/${slug}/new`}>
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
        <Typography variant="h4">{name}</Typography>
      </ListHeader>
      {/* <Backdrop open={CRUDLoading || listItemFormik.isSubmitting} /> */}
      <Paper variant="outlined">
        {error || !data ? (
          <ErrorLoading error={error} />
        ) : (
          <List>
            {data.getListItems.data.map((t, i) => (
              <>
                {i > 0 && <Divider />}
                <Link href={`/types/${t.types[0].slug}/${t.slug}`}>
                  <ListItem button key={t._id}>
                    <ListItemAvatar>
                      <Avatar alt={t.title} src={t.media[0] && t.media[0].url} />
                    </ListItemAvatar>
                    <ListItemText primary={t.title} secondary={t.description} />
                  </ListItem>
                </Link>
              </>
            ))}
          </List>
        )}
      </Paper>
      {/* <ListItemForm
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
      /> */}
    </>
  );
}
