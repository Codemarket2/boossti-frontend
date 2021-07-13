import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Avatar } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { DescriptionListIcon } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: 'white',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 0,
    background: 'transparent',
  },
  descriptionListIcon: {
    '& .description-list-icon__title, & .description-list-icon__subtitle': {
      color: 'white',
    },
  },
}));

const Integrations = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={<span className={classes.textWhite}>Syncronization with different companiees</span>}
        subtitle={
          <span className={classes.textWhite}>
            Forward thinking businesses use our cloud backup service to ensure data reliability and
            safety.
          </span>
        }
        data-aos="fade-up"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item: any, index: number) => (
          <Grid
            key={index}
            item
            container
            alignItems="center"
            direction="column"
            xs={12}
            sm={4}
            md={4}
            data-aos={'fade-up'}>
            <DescriptionListIcon
              icon={
                <Avatar className={classes.avatar}>
                  <Image src={item.logo} alt={item.name} />
                </Avatar>
              }
              title={item.name}
              subtitle={item.title}
              className={classes.descriptionListIcon}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Integrations;
