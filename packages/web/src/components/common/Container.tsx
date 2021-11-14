import Container from '@material-ui/core/Container';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  padding-bottom: ${(props) => props.theme.spacing(2)}px;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  ${(props) => props.theme.breakpoints.down('sm')} {
    padding-bottom: 60px;
  }
  video {
    width: 100% !important;
    height: auto !important;
  }
`;

export const DivContainer = styled.div`
  padding-bottom: ${(props) => props.theme.spacing(2)}px;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  ${(props) => props.theme.breakpoints.down('sm')} {
    padding-bottom: 60px;
  }
  video {
    width: 100% !important;
    height: auto !important;
  }
`;

export default StyledContainer;
