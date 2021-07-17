import React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  /**
   * External classes
   */
  className?: string;
  /**
   * Description
   */
  description: string;
  /**
   * Component Path
   */
  path: string;
  /**
   * Title
   */
  title: string;
  /**
   * All other props
   */
  [x:string]: any;
};

const Headline = ({ title, description, path, className, ...rest }: Props): JSX.Element => (
  <div className={className} {...rest}>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      <code>{path}</code>
    </Typography>
    <Typography variant="h6">
      {description}
    </Typography>
  </div>
);

export default Headline;
