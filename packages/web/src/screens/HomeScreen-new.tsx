import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import StarIcon from '@material-ui/icons/Star';
import CardHeader from '@material-ui/core/CardHeader';
import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import AppBar from '../components/common/AppBar';
import ErrorLoading from '../components/common/ErrorLoading';
import FormView from '../components/form2/FormView';
import NotFound from '../components/common/NotFound';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.boossti.com/">
        Boossti Inc.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {
    image: require('../assets/images/web-design.png'),
    title: 'Website Design',
    description: 'Best responsive websites along with SEO and paid Google Ads',
  },
  {
    image: require('../assets/images/instagram.png'),
    title: 'Social Media',
    description: 'Content for social media posts tailor made to your brand.',
  },
  {
    image: require('../assets/images/shopify.png'),
    title: 'E-Commerce',
    description: 'Setup product pages with media and optemization',
  },
];

const cards2 = [
  {
    image: require('../assets/images/web.gif'),
    title: 'Website Design',
    description: 'Best responsive websites along with SEO and paid Google Ads',
  },
];

const tiers = [
  {
    title: 'Basic',
    price: '499',
    description: ['3 page website', '1 social media channel', '1 post/week', '1 newsletter/month'],
    buttonText: '805-300-7217',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '799',
    description: ['5 page website', '2 social media channel', '2 post/week', '1 newsletter/month'],
    buttonText: 'sumi@boossti.com',
    buttonVariant: 'contained',
  },
  {
    title: 'Grow',
    price: '1,249',
    description: ['10 page website', '3 social media channel', '4 post/week', '1 newsletter/month'],
    buttonText: '805-300-7217',
    buttonVariant: 'outlined',
  },
];

export default function Album() {
  const classes = useStyles();

  return (
    <>
      <AppBar />
      <main>
        <div className={classes.heroContent}>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={6}>
              <Grid xs={12} sm={12} md={6} lg={6}>
                {cards2.map((card, i) => (
                  <Grid item key={i}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={card.image}
                        title={card.title}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                        <Typography>{card.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          805-300-7217
                        </Button>
                        <Button size="small" color="primary">
                          sumi@boossti.com
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="text-center">
                  <Button variant="contained" color="primary" className="m-2">
                    Tell Us About Your Project
                  </Button>
                  <FormPage slug="boossti-interest-form" />
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>

        {/* End hero unit */}
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          {/* Footer */}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {/* Something here to give the footer a purpose! */}
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </>
  );
}

export const FormPage = ({ slug, settings = {} }: { slug: string; settings?: any }) => {
  const { data, error } = useGetFormBySlug(slug);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }

  return (
    <FormView
      form={{ ...data.getFormBySlug, settings: { ...data.getFormBySlug?.settings, ...settings } }}
    />
  );
};
