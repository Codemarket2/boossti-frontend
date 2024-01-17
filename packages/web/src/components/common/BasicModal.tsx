import { ReactNode, CSSProperties } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Close from '@mui/icons-material/Close';

interface IBasicModal {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  secondButton?: ReactNode;
  minWidth?: string;
  maxWidth?: string;
  style?: CSSProperties;
  hideAppBar?: boolean;
}

export default function BasicModal({
  open,
  onClose,
  title,
  children,
  secondButton = null,
  minWidth = '60vw',
  maxWidth = '85vw',
  style,
  hideAppBar = false,
}: IBasicModal) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ minWidth, maxWidth, ...style }}>
          {!hideAppBar && (
            <AppBar color="inherit" position="static" elevation={1}>
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
      </Modal>
    </div>
  );
}
