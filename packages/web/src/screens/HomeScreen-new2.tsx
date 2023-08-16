/* eslint-disable global-require */
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import StarIcon from '@mui/icons-material/Star';
import CardHeader from '@mui/material/CardHeader';
import AppBar from '../components/common/AppBar';

const PREFIX = 'HomeScreen-new2';

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

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.icon}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.heroContent}`]: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },

  [`& .${classes.heroButtons}`]: {
    marginTop: theme.spacing(4),
  },

  [`& .${classes.cardGrid}`]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  [`& .${classes.card}`]: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  [`& .${classes.cardMedia}`]: {
    paddingTop: '56.25%', // 16:9
  },

  [`& .${classes.cardContent}`]: {
    flexGrow: 1,
  },

  [`& .${classes.cardHeader}`]: {
    backgroundColor:
      theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },

  [`& .${classes.cardPricing}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.footer}`]: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

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
    buttonText: 'info@boossti.com',
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
  return (
    <Root>
      <AppBar />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Local Business Social Network
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Co-marketing and co-promotion opportunities to grow your local business.
            </Typography>
            <div className="text-center">
              <Button variant="contained" color="primary" className="m-2">
                Referral Gift Cards
              </Button>
              <Button variant="outlined" color="primary" className="m-2">
                Raffle Prizes
              </Button>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia className={classes.cardMedia} image={card.image} title={card.title} />
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
                      info@boossti.com
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Pricing
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            Boost your marketing today. Pick a Plan.
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      variant={tier.buttonVariant}
                      color="primary"
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
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
    </Root>
  );
}
