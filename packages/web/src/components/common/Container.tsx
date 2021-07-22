import Container from '@material-ui/core/Container';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  /* min-height: '100vh'; */
  padding-bottom: ${(props) => props.theme.spacing(2)}px;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  ${(props) => props.theme.breakpoints.down('sm')} {
    padding-bottom: 60px;
    /* padding-top: 4px; */
  }
`;

export default StyledContainer;
