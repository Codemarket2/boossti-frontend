import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { ReactNode } from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  secondButton?: ReactNode;
  minWidth?: string;
}

export default function Overlay({
  open,
  onClose,
  title,
  children,
  secondButton = null,
  minWidth = '50vw',
}: IProps) {
  return (
    <Drawer anchor="right" open={open}>
      <div style={{ minWidth, maxWidth: '75vw' }}>
        <AppBar color="transparent" position="static" elevation={1}>
          <Toolbar>
            {title && (
              <Typography variant="h6" className="flex-grow-1">
                {title}
              </Typography>
            )}
            {secondButton}
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
