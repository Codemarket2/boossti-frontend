import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, GridList, GridListTile } from '@material-ui/core';

import { Image } from '../../../../components/atoms';

const useStyles = makeStyles(() => ({
  image: {
    objectFit: 'cover',
  },
}));

const Gallery = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <GridList cellHeight={isMd ? 300 : 100} cols={4} spacing={0}>
        {data.map((item: any, index: number) => (
          <GridListTile key={index} cols={item.cols || 1}>
            <Image
              {...item.image}
              alt={item.title}
              lazyProps={{ width: '100%', height: '100%' }}
              className={classes.image}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Gallery;
