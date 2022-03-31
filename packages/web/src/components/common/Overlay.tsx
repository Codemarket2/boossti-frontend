import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
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
  minWidth = '60vw',
}: IProps) {
  return (
    <Drawer anchor="right" open={open}>
      <div style={{ minWidth, maxWidth: '85vw' }}>
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
