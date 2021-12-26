import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { ReactNode } from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function ItemFormDrawer({ open, onClose, title, children }: IProps) {
  return (
    <Drawer anchor="right" open={open}>
      <div style={{ width: '75vw' }}>
        <AppBar color="transparent" position="static" elevation={1}>
          <Toolbar>
            <Typography variant="h6" className="flex-grow-1">
              {title}
            </Typography>
            <Button className="ml-2" onClick={onClose} color="primary" variant="outlined">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {children}
      </div>
    </Drawer>
  );
}
