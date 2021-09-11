import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CardBase, DescriptionListIcon } from '../../organisms';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
}));

/**
 * Component to display the category card
 *
 * @param {Object} props
 */
const CardCategory = ({
  icon,
  title,
  align = 'center',
  className,
  ...rest
}: CardCategoryProps): JSX.Element => {
  const classes = useStyles();

  return (
    <CardBase className={clsx(classes.root, className)} {...rest}>
      <DescriptionListIcon icon={icon} title={title} align={align} />
    </CardBase>
  );
};

export default CardCategory;
