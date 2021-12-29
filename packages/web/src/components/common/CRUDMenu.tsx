import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ReactNode } from 'react';

interface IProps {
  show: any;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: ReactNode;
  hideEdit?: boolean;
  hideDelete?: boolean;
}

export default function CRUDMenu({
  show,
  onDelete,
  onEdit,
  onClose,
  children,
  hideEdit = false,
  hideDelete = false,
}: IProps) {
  return (
    <Menu anchorEl={show} keepMounted open={Boolean(show)} onClose={onClose}>
      {!hideEdit && (
        <MenuItem onClick={onEdit}>
          <ListItemIcon className="mr-n4">
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      )}
      {!hideDelete && (
        <MenuItem onClick={onDelete}>
          <ListItemIcon className="mr-n4">
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      )}
      {children}
    </Menu>
  );
}
