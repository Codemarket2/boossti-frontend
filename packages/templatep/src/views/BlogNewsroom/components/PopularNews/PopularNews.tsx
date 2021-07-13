import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Button, Typography, Grid } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { CardProduct } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  cardProduct: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderRadius: theme.spacing(1),
    boxShadow: 'none',
    '& .card-product__content': {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      flex: '1 1 50%',
    },
    '& .card-product__media': {
      minHeight: 300,
      height: '100%',
      flex: '1 1 50%',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column !important',
      '& .card-product__content': {
        flex: '1 1 100%',
      },
      '& .card-product__media': {
        flex: '1 1 100%',
        width: '100%',
      },
    },
  },
  cardProductReverse: {
    flexDirection: 'row-reverse',
  },
  image: {
    objectFit: 'cover',
  },
  blogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-start',
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(3),
    },
  },
  blogTitle: {
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    padding: theme.spacing(1 / 2, 1),
    borderRadius: theme.spacing(1 / 2),
    background: theme.palette.primary.main,
    color: 'white',
    margin: theme.spacing(0, 1, 1, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 2, 0),
    },
  },
  author: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2, 0),
    },
  },
}));

const PopularNews = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const BlogMediaContent = (props: ImageProps) => (
    <Image {...props} className={classes.image} lazyProps={{ width: '100%', height: '100%' }} />
  );

  const BlogContent = (props: any) => (
    <div className={classes.blogContent}>
      <div className={classes.tags}>
        {props.tags.map((item: any, index: number) => (
          <Typography variant="caption" className={classes.tag} key={index}>
            {item}
          </Typography>
        ))}
      </div>
      <Typography variant="h6" color="textPrimary" className={classes.blogTitle}>
        {props.title}
      </Typography>
      <Typography variant="body2" color="textPrimary" className={classes.author}>
        <i>
          {props.author.name} - {props.date}
        </i>
      </Typography>
      <Typography variant="subtitle1" color="textPrimary">
        {props.subtitle}
      </Typography>
      <Button variant="outlined" color="primary" size="large" className={classes.button}>
        Read more
      </Button>
    </div>
  );

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="The most popular news"
        subtitle="Keep track of what's happening with your data, change permissions, and run reports against your data anywhere in the world. Keep track of what's happening with your data, change permissions."
        subtitleProps={{
          color: 'textPrimary',
        }}
        data-aos="fade-up"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} key={index} data-aos="fade-up">
            <CardProduct
              className={clsx(
                classes.cardProduct,
                index % 2 === 1 ? classes.cardProductReverse : {},
              )}
              mediaContent={<BlogMediaContent {...item.cover} alt={item.title} />}
              cardContent={
                <BlogContent
                  title={item.title}
                  subtitle={item.subtitle}
                  author={item.author}
                  date={item.date}
                  tags={item.tags}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PopularNews;
