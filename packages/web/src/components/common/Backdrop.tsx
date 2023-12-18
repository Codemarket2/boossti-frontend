import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: `${theme.zIndex.tooltip + 99991} !important`,
}));

interface IProps {
  open: boolean;
}

export default function BackdropComponent({ open = false }: IProps): any {
  return (
    <StyledBackdrop open={open}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
}
