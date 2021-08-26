import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  title: {
    fontWeight: 'bold',
  },
  icon: {
    padding: 0,
    marginLeft: theme.spacing(1),
    '&:hover': {
      background: 'transparent',
    },
  },
}));

/**
 * Component to display the "Learn More" link
 *
 * @param {Object} props
 */
const LearnMoreLink = ({
  color,
  component = 'a',
  variant = 'subtitle1',
  title,
  href = '#',
  className,
  iconProps = {},
  typographyProps = {},
  ...rest
}: LearnMoreLinkProps): JSX.Element => {

  const classes = useStyles();

  const children = (
    <>
      <Typography
        component="span"
        className={clsx('learn-more-link__typography', classes.title)}
        variant={variant}
        color={color || 'primary'}
        {...typographyProps}
      >
        {title}
      </Typography>
      <IconButton
        className={clsx('learn-more-link__icon-button', classes.icon)}
        color={'primary'}
        {...iconProps}
      >
        <ArrowRightAltIcon className="learn-more-link__arrow" />
      </IconButton>
    </>
  );

  return (
    <a
      href={href}
      className={clsx('learn-more-link', classes.root, className)}
      {...rest}
    >
      {children}
    </a>
  );
};

export default LearnMoreLink;
