import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { DescriptionCta } from '../../../../components/molecules';
import { CardProduct } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  cardProduct: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
    '& .card-product__content': {
      padding: theme.spacing(2),
    },
    '& .card-product__media': {
      minHeight: 300,
    },
  },
  image: {
    objectFit: 'cover',
  },
  blogTitle: {
    fontWeight: 700,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    fontWeight: 700,
    margin: theme.spacing(0, 1, 1, 0),
  },
  author: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2, 0),
    },
  },
  title: {
    fontWeight: 'bold',
  },
  descriptionCta: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
}));

const LatestStories = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const BlogMediaContent = (props: ImageProps) => (
    <Image {...props} className={classes.image} lazyProps={{ width: '100%', height: '100%' }} />
  );

  const BlogContent = (props: any) => (
    <div>
      <div className={classes.tags}>
        {props.tags.map((item: any, index: number) => (
          <Typography variant="overline" color="primary" className={classes.tag} key={index}>
            {item}
          </Typography>
        ))}
      </div>
      <Typography variant="h6" color="textPrimary" className={classes.blogTitle} align="center">
        {props.title}
      </Typography>
      <Typography variant="body2" color="textPrimary" className={classes.author} align="center">
        <i>
          {props.author.name} - {props.date}
        </i>
      </Typography>
      <Typography variant="body1" color="textPrimary" align="center">
        {props.subtitle}
      </Typography>
    </div>
  );

  return (
    <div className={className} {...rest}>
      <DescriptionCta
        title="Latest stories"
        primaryCta={
          <Button variant="outlined" color="primary" size="large">
            View all
          </Button>
        }
        align={'left'}
        titleProps={{
          variant: 'h4',
          color: 'textPrimary',
          className: classes.title,
        }}
        className={classes.descriptionCta}
        data-aos="fade-up"
      />
      <Grid container spacing={2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} sm={6} key={index} data-aos="fade-up">
            <CardProduct
              withShadow
              liftUp
              className={classes.cardProduct}
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

export default LatestStories;
