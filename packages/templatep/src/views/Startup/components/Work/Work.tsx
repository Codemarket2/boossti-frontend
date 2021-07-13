import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {} from '@material-ui/core';
import { useMediaQuery, Grid, Button } from '@material-ui/core';
import { Image, LearnMoreLink } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  listGrid: {
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
    '&:last-child': {
      marginBottom: theme.spacing(0),
    },
  },
}));

const Work = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} data-aos="fade-up" {...rest}>
      <SectionHeader
        title="Our Work"
        subtitle="Take a quick glance at some of our past projects. If you would like to see some more great work, get in touch with us to take a look at our private portfolio."
      />
      <Grid container justify="center">
        {data.map((item: any, index: number) => (
          <Grid
            data-aos="fade-up"
            key={index}
            item
            container
            xs={12}
            spacing={isMd ? 4 : 2}
            direction={index % 2 === 1 ? 'row-reverse' : 'row'}
            className={classes.listGrid}>
            <Grid item xs={12} sm={6}>
              <SectionHeader
                titleVariant="h5"
                title={item.title}
                subtitle={item.description}
                ctaGroup={[<LearnMoreLink title="Learn more" variant="h6" />]}
                align="left"
                disableGutter
              />
            </Grid>
            <Grid item container justify="center" xs={12} sm={6}>
              <Image src={item.illustration} alt={item.title} />
            </Grid>
          </Grid>
        ))}
        <Grid item container justify="center" xs={12}>
          <Button variant="contained" color="primary">
            Contact us
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Work;
