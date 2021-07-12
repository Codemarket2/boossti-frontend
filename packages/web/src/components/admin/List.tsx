import { useListCRUD } from '@frontend/shared/hooks/list';
import InitialLoading from '../common/InitialLoading';
import ShowError from '../common/ShowError';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ItemForm from './ItemForm';
import ListForm from './ListForm';
// import { onAlert } from '../../utils/alert';
import styled from 'styled-components';

interface IProps {
  _id: any;
}

const StyledBackdrop = styled(Backdrop)`
  z-index: ${(props) => props.theme.zIndex.drawer + 1};
  color: '#fff';
`;

export default function ListPage({ _id }: IProps) {
  const router = useRouter();
  const [state2, setState2] = useState<any>({
    showMenu: null,
    selectedItem: { title: '', _id: '' },
  });
  const onListDelete = () => router.push('/admin');
  const onItemDelete = () => {
    // setState2({ ...state, showMenu: null });
    alert('Item Deleted');
  };
  const {
    state,
    setState,
    listFormik,
    itemFormik,
    list,
    loading,
    error,
    handleDeleteList,
    handleDeleteItem,
  } = useListCRUD({
    _id,
    onListDelete,
    onItemDelete,
  });

  if (error) {
    return <ShowError error={error} />;
  } else if (loading || !list) {
    return <InitialLoading />;
  }

  return (
    <>
      <StyledBackdrop open={state.itemdeleteLoading}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <ListForm
        open={state.showListForm}
        onClose={() => setState({ ...state, showListForm: false })}
        formik={listFormik}
        formTitle="Update List Name"
      />
      <ItemForm
        open={state.showItemForm}
        onClose={() => setState({ ...state, showItemForm: false })}
        formik={itemFormik}
        edit={state.editItem}
      />
      <Paper>
        <div className="pt-2 pl-3 d-flex justify-content-between align-items-center">
          <Typography variant="h5">List of {list.name}</Typography>
          <div>
            <Tooltip title="Add New Item">
              <IconButton
                onClick={() => {
                  itemFormik.handleReset('');
                  setState({ ...state, showItemForm: true, editItem: false });
                }}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Update List Name">
              <IconButton
                onClick={() => {
                  listFormik.setFieldValue('name', list.name, false);
                  setState({ ...state, showListForm: true });
                }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete List">
              <IconButton disabled={state.listdeleteLoading} onClick={handleDeleteList}>
                {state.listdeleteLoading ? <CircularProgress size={23} /> : <DeleteIcon />}
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <List component="div">
          {list.items.map((item, index) => (
            <>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={`${index + 1} ${item.title}`}
                  secondary={item.description || null}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Update or Delete">
                    <IconButton
                      edge="end"
                      onClick={(event) =>
                        setState2({ ...state2, showMenu: event.currentTarget, selectedItem: item })
                      }>
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          ))}
        </List>
        <Menu
          anchorEl={state2.showMenu}
          keepMounted
          open={Boolean(state2.showMenu)}
          onClose={() => setState2({ ...state2, showMenu: null })}>
          <MenuItem
            onClick={() => {
              itemFormik.setFieldValue('title', state2.selectedItem.title, false);
              itemFormik.setFieldValue('description', state2.selectedItem.description || '', false);
              itemFormik.setFieldValue('_id', state2.selectedItem._id, false);
              setState({ ...state, showItemForm: true, editItem: true });
              setState2({ ...state2, showMenu: null });
            }}>
            <ListItemIcon className="mr-n4">
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit Item" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setState2({ ...state, showMenu: null });
              handleDeleteItem(state2.selectedItem._id);
            }}>
            <ListItemIcon className="mr-n4">
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete Item" />
          </MenuItem>
        </Menu>
      </Paper>
    </>
  );
}
