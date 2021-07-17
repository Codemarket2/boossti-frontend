import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Grid, Button, Avatar } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { DescriptionListIcon } from '../../../../components/organisms';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 0,
    background: 'transparent',
  },
}));

const Integrations = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} data-aos="fade-up" {...rest}>
      <SectionHeader
        title="Integrations"
        subtitle="TheFront integrates with all the tools you love and use, to allow you to work smarter and faster."
        ctaGroup={[
          <Button variant="outlined" size={isMd ? 'large' : 'medium'} color="primary">
            See all integrations
          </Button>,
        ]}
        fadeUp
      />
      <Grid container spacing={4}>
        {data.map((item: any, index: number) => (
          <Grid
            key={index}
            item
            container
            alignItems="center"
            direction="column"
            xs={12}
            sm={6}
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
              align="center"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Integrations;
