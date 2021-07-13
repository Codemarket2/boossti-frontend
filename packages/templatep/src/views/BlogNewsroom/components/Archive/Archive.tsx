import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { CardProduct } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  cardProduct: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    '& .card-product__content': {
      padding: theme.spacing(2, 0, 0, 0),
    },
    '& .card-product__media': {
      height: 160,
      '& img': {
        height: 160,
      },
    },
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
  blogTitle: {
    fontWeight: 700,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
}));

const Archive = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const BlogMediaContent = (props: ImageProps) => <Image {...props} className={classes.image} />;

  const BlogContent = (props: any) => (
    <div className={classes.blogContent}>
      <Typography variant="body2" color="textPrimary" className={classes.blogTitle} gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="caption" color="textPrimary">
        <i>
          {props.author.name} - {props.date}
        </i>
      </Typography>
    </div>
  );

  return (
    <div className={className} {...rest}>
      <SectionHeader title="Archived news" data-aos="fade-up" align="left" />
      <Grid container spacing={2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={6} md={3} key={index} data-aos="fade-up">
            <CardProduct
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

export default Archive;
