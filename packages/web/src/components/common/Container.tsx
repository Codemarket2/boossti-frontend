import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    paddingBottom: 60,
  },
  // video {
  //   width: 100% !important;
  //   height: auto !important;
  // }
}));

// const StyledContainer = styled(Container)`
//   padding-bottom: ${(props) => props.theme.spacing(2)}px;
//   /* padding-top: ${(props) => props.theme.spacing(1)}px; */
//   ${(props) => props.theme.breakpoints.down('md')} {
//     padding-bottom: 60px;
//   }
//   video {
//     width: 100% !important;
//     height: auto !important;
//   }
// `;

export default StyledContainer;
