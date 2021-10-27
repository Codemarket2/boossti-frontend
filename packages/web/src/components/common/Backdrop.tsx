import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const StyledBackdrop = styled(Backdrop)`
  z-index: ${(props) => props.theme.zIndex.tooltip + 9999} !important;
`;

interface IProps {
  open: boolean;
}

export default function BackdropComponent({ open = false }: IProps) {
  return (
    <StyledBackdrop open={open}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
}
