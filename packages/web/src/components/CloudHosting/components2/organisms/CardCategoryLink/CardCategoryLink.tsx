import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IconAlternate } from '../../molecules';
import { CardBase } from '..';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  fontWeight700: {
    fontWeight: 700,
  },
  categoryIconButton: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
}));

/**
 * Component to display the category link card
 *
 * @param {Object} props
 */
const CardCategoryLink = ({
  fontIconClass,
  color,
  title,
  subtitle,
  href = '#',
  align = 'left',
  className,
  iconAlternateProps = {},
  titleProps = {},
  subtitleProps = {},
  ...rest
}: CardCategoryLinkProps): JSX.Element => {
  const classes = useStyles();

  let justifyGrid:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined = 'flex-start';
  if (align === 'center') {
    justifyGrid = 'center';
  } else if (align === 'right') {
    justifyGrid = 'flex-end';
  }
  return (
    <CardBase className={clsx('card-category-link', classes.root, className)} {...rest}>
      <>
        <Grid container spacing={2} className="card-category-link__wrapper">
          <Grid item container justify={justifyGrid} xs={12}>
            <IconAlternate
              fontIconClass={fontIconClass}
              color={color}
              size="medium"
              {...iconAlternateProps}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align={align}
              className={classes.fontWeight700}
              {...titleProps}
            >
              {title}
            </Typography>
          </Grid>
          {subtitle && (
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align={align}
                color="textSecondary"
                {...subtitleProps}
              >
                {subtitle}
              </Typography>
            </Grid>
          )}
        </Grid>
        <a href={href} className={clsx('card-category-link__item', classes.categoryIconButton)}>
          <IconButton className="card-category-link__icon-button">
            <ArrowRightAltIcon className="card-category-link__icon" style={{ color: color[500] }} />
          </IconButton>
        </a>
      </>
    </CardBase>
  );
};

export default CardCategoryLink;
