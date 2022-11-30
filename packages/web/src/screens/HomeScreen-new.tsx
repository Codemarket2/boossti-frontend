/* eslint-disable global-require */
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
// import StarIcon from '@mui/icons-material/Star';
// import CardHeader from '@mui/material/CardHeader';
import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import AppBar from '../components/common/AppBar';
import ErrorLoading from '../components/common/ErrorLoading';
import FormView from '../components/form2/FormView';
import NotFound from '../components/common/NotFound';
import { DisplayForm } from '../components/form2/DisplayForm';

const PREFIX = 'FormPage';
const classes = {
  icon: `${PREFIX}-icon`,
  heroContent: `${PREFIX}-heroContent`,
  heroButtons: `${PREFIX}-heroButtons`,
  cardGrid: `${PREFIX}-cardGrid`,
  card: `${PREFIX}-card`,
  cardMedia: `${PREFIX}-cardMedia`,
  cardContent: `${PREFIX}-cardContent`,
  cardHeader: `${PREFIX}-cardHeader`,
  cardPricing: `${PREFIX}-cardPricing`,
  footer: `${PREFIX}-footer`,
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.boossti.com/">
        Boossti Inc.
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

// const cards = [
//   {
//     image: require('../assets/images/web-design.png'),
//     title: 'Website Design',
//     description: 'Best responsive websites along with SEO and paid Google Ads',
//   },
//   {
//     image: require('../assets/images/instagram.png'),
//     title: 'Social Media',
//     description: 'Content for social media posts tailor made to your brand.',
//   },
//   {
//     image: require('../assets/images/shopify.png'),
//     title: 'E-Commerce',
//     description: 'Setup product pages with media and optemization',
//   },
// ];

const cards2 = [
  {
    image: require('../assets/images/web.gif'),
    title: 'Website Design',
    description: 'Best responsive websites along with SEO and paid Google Ads',
  },
];

// const tiers = [
//   {
//     title: 'Basic',
//     price: '499',
//     description: ['3 page website', '1 social media channel', '1 post/week', '1 newsletter/month'],
//     buttonText: '805-300-7217',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Pro',
//     subheader: 'Most popular',
//     price: '799',
//     description: ['5 page website', '2 social media channel', '2 post/week', '1 newsletter/month'],
//     buttonText: 'sumi@boossti.com',
//     buttonVariant: 'contained',
//   },
//   {
//     title: 'Grow',
//     price: '1,249',
//     description: ['10 page website', '3 social media channel', '4 post/week', '1 newsletter/month'],
//     buttonText: '805-300-7217',
//     buttonVariant: 'outlined',
//   },
// ];

export default function Album() {
  return (
    <>
      <AppBar />
      <main>
        <div className={classes.heroContent}>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={1}>
              <Grid xs={12} sm={12} md={6} lg={6}>
                <Grid container className="mt-5">
                  {cards2.map((card, i) => (
                    <Grid item key={i}>
                      <Card className={classes.card}>
                        <div style={{ width: '100%' }}>
                          <img src={card.image} alt={card.title} style={{ width: '100%' }} />
                        </div>
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
