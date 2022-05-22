import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
          <ListItemIcon className="mr-n3">
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      )}
      {!hideDelete && (
        <MenuItem
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            const anwser = confirm('Are you sure you want delete?');
            if (anwser) {
              onDelete();
            }
          }}
        >
          <ListItemIcon className="mr-n3">
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      )}
      {children}
    </Menu>
  );
}
