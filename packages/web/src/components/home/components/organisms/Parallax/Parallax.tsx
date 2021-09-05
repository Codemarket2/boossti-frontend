import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    objectFit: 'cover',
    /* support for plugin https://github.com/bfred-it/object-fit-images */
    fontFamily: 'object-fit: cover;',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
}));

/**
 * Component to display the Parallax backgrounds
 *
 * @param {Object} props
 */
const Parallax = ({ backgroundImage, children, className, ...rest }: ParallaxProps): JSX.Element => {
  const classes = useStyles();

  React.useEffect(() => {
    const jarallaxElems = document.querySelectorAll('.jarallax');
    if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
      return;
    }

    const jarallax = require('jarallax').jarallax;
    jarallax(jarallaxElems, { speed: 0.2 });
  });

  return (
    <div
      className={clsx('jarallax', 'parallax', classes.root, className)}
      data-jarallax
      data-speed="0.2"
      {...rest}
    >
      <div
        className={clsx('jarallax-img', 'parallax__image', classes.image)}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {children}
    </div>
  );
};

export default Parallax;
