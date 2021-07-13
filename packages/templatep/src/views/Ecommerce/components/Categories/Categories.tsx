import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { DescriptionListIcon, CardBase } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  image: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    marginBottom: theme.spacing(5),
  },
  descriptionListIcon: {
    '& .description-list-icon__title': {
      fontWeight: 400,
      fontSize: 16,
    },
  },
  cardBase: {
    borderRadius: theme.spacing(2),
    background: theme.palette.alternate.main,
  },
}));

const Categories = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <SectionHeader title="Categories" align="left" />
      <Grid container spacing={2}>
        {data.map((item: any, index: number) => (
          <Grid item xs={6} md={2} key={index} data-aos="fade-up">
            <CardBase noBorder noShadow liftUp className={classes.cardBase}>
              <DescriptionListIcon
                className={classes.descriptionListIcon}
                icon={<Image {...item.icon} alt={item.title} className={classes.image} />}
                title={item.title}
              />
            </CardBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories;
