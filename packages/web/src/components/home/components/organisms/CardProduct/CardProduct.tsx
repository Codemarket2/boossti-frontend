import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  withShadow: {
    boxShadow: `0 2px 10px 0 ${theme.palette.cardShadow}`,
  },
  noShadow: {
    boxShadow: 'none',
  },
  noBorder: {
    border: 0,
  },
  noBg: {
    background: 'transparent',
  },
  liftUp: {
    transition:
      'box-shadow .25s ease,transform .25s ease,-webkit-transform .25s ease',
    '&:hover': {
      boxShadow:
        '0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important',
      transform: 'translate3d(0,-5px,0)',
    },
  },
  media: {
    position: 'relative',
    height: 300,
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 2),
    '&:last-child': {
      padding: theme.spacing(4, 2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 3),
      '&:last-child': {
        padding: theme.spacing(6, 3),
      },
    },
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
}));

/**
 * Component to display the product card
 *
 * @param {Object} props
 */
const CardProduct = ({
  mediaClassName,
  withShadow,
  noShadow,
  noBorder,
  noBg,
  liftUp,
  cardContent,
  mediaContent,
  align = 'left',
  className,
  ...rest
}: CardProductProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(
        'card-product',
        classes.root,
        withShadow ? classes.withShadow : {},
        noShadow ? classes.noShadow : {},
        noBorder ? classes.noBorder : {},
        noBg ? classes.noBg : {},
        liftUp ? classes.liftUp : {},
        className,
      )}
      {...rest}
    >
      <CardMedia
        className={clsx('card-product__media', classes.media, mediaClassName)}
      >
        {mediaContent}
      </CardMedia>
      <CardContent
        className={clsx(
          'card-product__content',
          classes.content,
          classes[align],
        )}
      >
        {cardContent}
      </CardContent>
    </Card>
  );
};

export default CardProduct;
