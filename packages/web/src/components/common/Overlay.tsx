import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { ReactNode } from 'react';
import Close from '@mui/icons-material/Close';

interface IProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  secondButton?: ReactNode;
  minWidth?: string;
  maxWidth?: string;
  hideAppBar?: boolean;
}

export default function Overlay({
  open,
  onClose,
  title,
  children,
  secondButton = null,
  minWidth = '60vw',
  maxWidth = '85vw',
  hideAppBar = false,
}: IProps) {
  return (
    <Drawer anchor="right" open={open}>
      <div style={{ minWidth, maxWidth }}>
        {!hideAppBar && (
          <AppBar color="transparent" position="static" elevation={1}>
            <Toolbar variant="dense">
              {title && (
                <Typography variant="h6" className="flex-grow-1">
                  {title}
                </Typography>
              )}
              {secondButton}
              <Button
                className="ml-2"
                startIcon={<Close />}
                onClick={onClose}
                color="primary"
                variant="contained"
                size="small"
              >
                Close
              </Button>
            </Toolbar>
          </AppBar>
        )}

        {children}
      </div>
    </Drawer>
  );
}
