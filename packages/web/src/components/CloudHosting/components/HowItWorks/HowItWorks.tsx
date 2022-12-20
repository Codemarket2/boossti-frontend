import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Button, useMediaQuery, NoSsr, colors } from '@material-ui/core';
import { SectionHeader } from '../../components2/molecules';
import { CardBase, DescriptionListIcon } from '../../components2/organisms';

const useStyles = makeStyles((theme) => ({
  iconCover: {
    width: 60,
    height: 60,
    background:
      'url(https://assets.maccarianagency.com/the-front/illustrations/bgicon.svg) no-repeat center center',
    backgroundSize: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.yellow[700],
    fontSize: 35,
    [theme.breakpoints.up('md')]: {
      width: 80,
      height: 80,
      fontSize: 40,
    },
  },
  cta: {
    marginTop: theme.spacing(3),
  },
}));

const HowItWorks = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <CardBase withShadow>
        <>
          <SectionHeader label="Process we do" title="How it works" />
          <Grid container spacing={isMd ? 4 : 2}>
            {data.map((item: any, index: number) => (
              <Grid item xs={12} md={4} key={index} data-aos="fade-up">
                <DescriptionListIcon
                  icon={
                    <div className={classes.iconCover}>
                      <NoSsr>
                        <i className={item.icon} />
                      </NoSsr>
                    </div>
                  }
                  title={item.title}
                  subtitle={item.subtitle}
                />
              </Grid>
            ))}
          </Grid>
          <Button color="primary" variant="contained" size="large" className={classes.cta}>
            get started
          </Button>
        </>
      </CardBase>
    </div>
  );
};

export default HowItWorks;
