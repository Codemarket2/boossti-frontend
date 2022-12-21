import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Section } from '..';

const useStyles = makeStyles(() => ({
  root: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

const HeroSimpleBackground = ({
  children,
  backgroundSize = 'cover',
  backgroundImage,
  backgroundPosition = 'center',
  className,
  ...rest
}: HeroSimpleBackgroundProps): JSX.Element => {
  const classes = useStyles();

  const useBackground = makeStyles(() => ({
    backgroundImage: {
      backgroundImage: `url(${backgroundImage})`,
    },
    backgroundSize: {
      backgroundSize,
    },
    backgroundPosition: {
      backgroundPosition,
    },
  }));
  const backgroundClasses = useBackground();

  return (
    <div
      className={clsx(
        'hero-simple-background',
        classes.root,
        className,
        backgroundClasses.backgroundImage,
        backgroundClasses.backgroundSize,
        backgroundClasses.backgroundPosition,
      )}
      {...rest}
    >
      <Section className="hero-simple-background__section">{children}</Section>
    </div>
  );
};

export default HeroSimpleBackground;
