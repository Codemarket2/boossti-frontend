import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';

/**
 * Component to display the Count Up Numbers
 *
 * @param {Object} props
 */
const CountUpNumber = ({
  start = 0,
  end,
  suffix,
  prefix,
  label,
  textColor,
  labelColor,
  className,
  visibilitySensorProps = {},
  wrapperProps = {},
  countWrapperProps = {},
  countNumberProps = {},
  labelProps = {},
  ...rest
}: CountUpNumberProps): JSX.Element => {
  const [viewPortEntered, setViewPortEntered] = React.useState<boolean>(false);
  const setViewPortVisibility = (isVisible: boolean) => {
    if (viewPortEntered) {
      return;
    }

    setViewPortEntered(isVisible);
  };

  return (
    <div className={clsx('countup-number', className)} {...rest}>
      <VisibilitySensor
        onChange={isVisible => setViewPortVisibility(isVisible)}
        delayedCall
        {...visibilitySensorProps}
      >
        <div className="countup-number__wrapper" {...wrapperProps}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            color={textColor || 'textPrimary'}
            className="countup-number__count-wrapper"
            {...countWrapperProps}
          >
            <CountUp
              delay={1}
              redraw={false}
              end={viewPortEntered ? end : start}
              start={start}
              suffix={suffix || ''}
              prefix={prefix || ''}
              className="countup-number__count"
              {...countNumberProps}
            />
          </Typography>
          <Typography
            variant="subtitle1"
            color={labelColor || 'textSecondary'}
            align="center"
            className="countup-number__label"
            {...labelProps}
          >
            {label}
          </Typography>
        </div>
      </VisibilitySensor>
    </div>
  );
};

export default CountUpNumber;
