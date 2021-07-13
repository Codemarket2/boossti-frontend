import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, GridList, GridListTile } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
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
      <SectionHeader
        title="Checkout our gallery"
        subtitle="After 3 days all of your offers will arrive and you will have another 7 days to select your new company."
        data-aos="fade-up"
      />
      <GridList cellHeight={isMd ? 360 : 260} cols={4} spacing={isMd ? 24 : 8}>
        {data.map((item: any, index: number) => (
          <GridListTile key={index} cols={isMd ? item.cols : 4 || 1}>
            <Image
              {...item.image}
              alt={item.location}
              className={classes.image}
              lazyProps={{
                width: '100%',
                height: '100%',
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Gallery;
