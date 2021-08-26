import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography } from '@material-ui/core';

/**
 * Component to display the description with CTA's
 *
 * @param {Object} props
 */
const DescriptionCta = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  align = 'center',
  className,
  wrapperProps = {},
  titleProps = {},
  subtitleProps = {},
  buttonGroupProps = {},
  primaryButtonWrapperProps = {},
  secondaryButtonWrapperProps = {},
  ...rest
}: DescriptionCtaProps): JSX.Element => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });

  let justifyGrid: ('center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined) = 'center';
  if (align === 'left') {
    justifyGrid = isSm ? 'flex-end' : 'flex-start';
  } else if (align === 'right') {
    justifyGrid = isSm ? 'flex-start' : 'flex-end';
  }

  return (
    <Grid
      container
      spacing={2}
      justify="space-between"
      alignItems="center"
      className={clsx('description-cta', className)}
      {...rest}
    >
      <Grid item className="description-cta__wrapper" {...wrapperProps}>
        <Typography
          variant="h5"
          align={align}
          gutterBottom
          className="description-cta__title"
          {...titleProps}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="subtitle1"
            align={align}
            color="textSecondary"
            className="description-cta__subtitle"
            {...subtitleProps}
          >
            {subtitle}
          </Typography>
        )}
      </Grid>
      <Grid item>
        <Grid
          container
          justify={justifyGrid || 'center'}
          spacing={1}
          className="description-cta__button-group"
          {...buttonGroupProps}
        >
          <Grid
            item
            className="description-cta__primary-button-wrapper"
            {...primaryButtonWrapperProps}
          >
            {primaryCta}
          </Grid>
          {secondaryCta && (
            <Grid
              item
              className={clsx('description-cta__secondary-button-wrapper')}
              {...secondaryButtonWrapperProps}
            >
              {secondaryCta}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DescriptionCta;
