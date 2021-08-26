import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
  },
}));

/**
 * Component to display the description list with icon
 *
 * @param {Object} props
 */
const DescriptionListIcon = ({
  title,
  subtitle,
  icon,
  align = 'center',
  titleVariant = 'h6',
  subtitleVariant = 'body1',
  className,
  titleProps = {},
  subtitleProps = {},
  ...rest
}: DescriptionListIconProps): JSX.Element => {
  const classes = useStyles();

  let gridJustify: ('center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined) = 'center';

  if (align === 'left') {
    gridJustify = 'flex-start';
  } else if (align === 'right') {
    gridJustify = 'flex-end';
  }

  return (
    <Grid
      container
      spacing={2}
      {...rest}
      className={clsx('description-list-icon', className)}
    >
      <Grid
        item
        container
        justify={gridJustify}
        xs={12}
        className="description-list-icon__icon-wrapper"
      >
        {icon}
      </Grid>
      <Grid item xs={12} className="description-list-icon__title-wrapper">
        <Typography
          variant={titleVariant}
          color="textPrimary"
          align={align}
          className={clsx(classes.title, 'description-list-icon__title')}
          {...titleProps}
        >
          {title}
        </Typography>
      </Grid>
      {subtitle && (
        <Grid item xs={12} className="description-list-icon__subtitle-wrapper">
          <Typography
            variant={subtitleVariant}
            color="textSecondary"
            align={align}
            className="description-list-icon__subtitle"
          >
            {subtitle}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default DescriptionListIcon;
