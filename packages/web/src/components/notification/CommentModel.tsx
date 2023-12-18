import React from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CommentsList from '../comment/CommentsList';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledPaper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #eee',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  height: '70vh',
  overflowY: 'scroll',
}));

export default function CommentModel({ notification }: { notification: any }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleOpen}>{notification.title}</div>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <StyledPaper>
            <CommentsList parentIds={notification.threadId} threadId={notification.threadId} />
          </StyledPaper>
        </Fade>
      </StyledModal>
    </>
  );
}
