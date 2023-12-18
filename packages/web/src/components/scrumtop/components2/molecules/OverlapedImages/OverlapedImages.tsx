import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Image } from '../../atoms';

const useStyles = makeStyles((theme) => ({
  imageGrid: {
    padding: '.25rem',
    width: '150%',
    boxShadow: '0 1.5rem 4rem rgba(22,28,45,.1)',
    background: theme.palette.background.paper,
    '& img': {
      maxWidth: '100%',
      height: 'auto',
      verticalAlign: 'middle',
      borderStyle: 'none',
    },
  },
  imageGridFirstItem: {
    marginTop: '4rem',
  },
  imageGridLastItem: {
    marginTop: '6rem',
    float: 'right',
  },
}));

/**
 * Component to display the overlaped images
 *
 * @param {Object} props
 */
const OverlapedImages = ({
  image1,
  image2,
  image3,
  className,
  ...rest
}: OverlapedImagesProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container className={clsx('overlaped-images', className)} {...rest}>
      <Grid item xs={4} className="overlaped-images__item-container">
        <div
          className={clsx(
            'overlaped-images__item-wrapper',
            classes.imageGrid,
            classes.imageGridFirstItem,
          )}
        >
          <Image
            src={image1.src}
            srcSet={image1.srcSet}
            alt={image1.alt}
            className="overlaped-images__item-image"
          />
        </div>
      </Grid>
      <Grid item xs={4} className="overlaped-images__item-container">
        <div className={clsx('overlaped-images__item-wrapper', classes.imageGrid)}>
          <Image
            src={image2.src}
            srcSet={image2.srcSet}
            alt={image2.alt}
            className="overlaped-images__item-image"
          />
        </div>
      </Grid>
      <Grid item xs={4} className="overlaped-images__item-container">
        <div
          className={clsx(
            'overlaped-images__item-wrapper',
            classes.imageGrid,
            classes.imageGridLastItem,
          )}
        >
          <Image
            src={image3.src}
            srcSet={image3.srcSet}
            alt={image3.alt}
            className="overlaped-images__item-image"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default OverlapedImages;
