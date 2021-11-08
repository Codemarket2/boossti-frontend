import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const StyledBackdrop = styled(Backdrop)`
  z-index: ${(props) => props.theme.zIndex.tooltip + 99991} !important;
`;

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
