import Container from '@material-ui/core/Container';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  /* min-height: '100vh'; */
  ${(props) => props.theme.breakpoints.down('sm')} {
    padding-bottom: 60px;
    padding-top: 4px;
  }
`;

export default StyledContainer;
