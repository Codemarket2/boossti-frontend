import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Swiper from 'swiper';

import { Image } from '../../atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 'auto',
  },
  swiperSlide: {
    width: 'auto',
  },
  swiperNav: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: 88,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 4,
    '& .swiper-button-prev, & .swiper-button-next': {
      width: theme.spacing(3),
      height: theme.spacing(3),
      padding: theme.spacing(2),
      background: theme.palette.primary.main,
      borderRadius: '100%',
      position: 'relative',
      boxShadow: `0 2px 10px 0 ${theme.palette.cardShadow}`,
      border: `2px solid ${theme.palette.background.paper}`,
      '&:after': {
        fontSize: 'initial',
        color: theme.palette.background.paper,
      },
    },
    '& .swiper-button-prev': {
      left: 0,
    },
    '& .swiper-button-next': {
      right: 0,
    },
  },
  image: {
    objectFit: 'cover',
  },
}));

/**
 * Component to display the image swiper
 *
 * @param {Object} props
 */
const SwiperImage = ({
  items,
  navigationButtonStyle,
  imageClassName,
  className,
  ...rest
}: SwiperImageProps): JSX.Element => {
  const classes = useStyles();

  React.useEffect(() => {
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-container .swiper-button-next',
        prevEl: '.swiper-container .swiper-button-prev',
      },
    });
  });

  return (
    <div className={clsx('swiper-container', 'swiper-image', classes.root, className)} {...rest}>
      <div className="swiper-image__wrapper, swiper-wrapper">
        {items.map((item, index) => (
          <div
            className={clsx('swiper-image__slide', 'swiper-slide', classes.swiperSlide)}
            key={index}>
            <Image
              src={item.src}
              alt={item.alt}
              srcSet={item.srcSet}
              lazyProps={{ width: '100%', height: '100%' }}
              className={clsx(
                'swiper-image__item',
                classes.image,
                imageClassName ? imageClassName : {},
              )}
            />
          </div>
        ))}
      </div>
      <div className={clsx('swiper-image__navigation', classes.swiperNav)}>
        <div
          className={clsx(
            'swiper-image__navigation-button',
            'swiper-image__navigation-button--prev',
            'swiper-button-prev',
            navigationButtonStyle || {},
          )}
        />
        <div
          className={clsx(
            'swiper-image__navigation-button',
            'swiper-image__navigation-button--next',
            'swiper-button-next',
            navigationButtonStyle || {},
          )}
        />
      </div>
    </div>
  );
};

export default SwiperImage;
