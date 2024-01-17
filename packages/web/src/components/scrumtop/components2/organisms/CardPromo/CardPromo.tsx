import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
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
}));

/**
 * Component to display the promo card
 *
 * @param {Object} props
 */
const CardPromo = ({
  titleColor,
  fontIconClass,
  color,
  title,
  subtitle,
  description,
  align = 'left',
  className,
  iconAlternateProps = {},
  titleProps = {},
  subtitleProps = {},
  descriptionProps = {},
  ...rest
}: CardPromoProps): JSX.Element => {
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
    <CardBase className={clsx('card__promo', classes.root, className)} {...rest}>
      <Grid container spacing={2} className="card-promo__wrapper">
        <Grid item container justify={justifyGrid} xs={12} className="card-promo__icon-wrapper">
          <IconAlternate
            fontIconClass={fontIconClass}
            color={color}
            size="medium"
            className="card-promo__icon"
            {...iconAlternateProps}
          />
        </Grid>
        <Grid item xs={12} className="card-promo__title-wrapper">
          <Typography
            variant="h4"
            align={align}
            className={clsx('card-promo__title', classes.fontWeight700)}
            color={titleColor || 'textPrimary'}
            {...titleProps}
          >
            {title}
          </Typography>
        </Grid>
        {subtitle && (
          <Grid item xs={12} className="card-promo__subtitle-wrapper">
            <Typography
              variant="h6"
              align={align}
              className={clsx('card-promo__subtitle', classes.fontWeight700)}
              {...subtitleProps}
            >
              {subtitle}
            </Typography>
          </Grid>
        )}
        {description && (
          <Grid item xs={12} className="card-promo__description-wrapper">
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align={align}
              className="card-promo__description"
              {...descriptionProps}
            >
              {description}
            </Typography>
          </Grid>
        )}
      </Grid>
    </CardBase>
  );
};

export default CardPromo;
