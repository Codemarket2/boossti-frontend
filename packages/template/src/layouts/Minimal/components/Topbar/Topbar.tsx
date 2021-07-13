import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { Image } from '../../../../components/atoms';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  logoContainer: {
    width: 100,
    height: 28,
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 32,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
}));

interface Props {
  themeMode: string;
  className?: string;
}

const Topbar = ({ themeMode, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Toolbar className={clsx(classes.toolbar, className)} {...rest}>
      <div className={classes.logoContainer}>
        <a href="/" title="thefront">
          <Image
            className={classes.logoImage}
            src={
              themeMode === 'light'
                ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
                : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
            }
            alt="thefront"
            lazy={false}
          />
        </a>
      </div>
    </Toolbar>
  );
};

export default Topbar;
