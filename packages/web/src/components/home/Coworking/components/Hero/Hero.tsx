import { useRouter } from 'next/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Button, Typography, Container, Grid } from '@material-ui/core';
import { SectionHeader, SwiperImage } from '../../../components/molecules';
import AuthScreen from '@frontend/web/src/screens/AuthScreen';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '75vh',
    width: '100%',
    overflow: 'hidden',
  },
  tagLine: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerFormGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  swiperNavButton: {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    padding: `${theme.spacing(2)}px !important`,
  },
}));

const Hero = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const router = useRouter();
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const authenticated = useSelector(({ auth }: any) => auth.authenticated);

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.tagLine}>
          <SectionHeader
            title={
              <span>
                Learn, Share &{' '}
                <Typography component="span" variant="inherit" color="primary">
                  Get Well Soon
                </Typography>
              </span>
            }
            subtitle="Stories about prevention and survival."
            ctaGroup={[
              <Button variant="contained" color="primary" size={isMd ? 'large' : 'medium'}>
                Tell Your Story
              </Button>,
              // <Button variant="outlined" color="primary" size={isMd ? 'large' : 'medium'}>
              // Browse
              // </Button>,
            ]}
            align="left"
            titleVariant="h3"
          />
        </Grid>
        {!authenticated && (
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.centerFormGrid}>
            <AuthScreen signinSuccessCallback={() => router.push('/feeds')} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Hero;
