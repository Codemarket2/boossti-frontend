import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { CardBase } from '../../../../components/organisms';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  cardBase: {
    height: 'auto',
    '& .card-base__content': {
      padding: 0,
      height: 'auto',
    },
  },
  linkContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.background.level2}`,
  },
  title: {
    fontWeight: 'bold',
  },
}));

const Pages = ({
  themeMode = 'light',
  data,
  className,
  ...rest
}: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Secondary Pages"
        subtitle="These are the supporting pages to supplement the main landings."
        align="left"
      />
      <Grid container spacing={4}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} sm={6} key={index} data-aos="fade-up">
            <a href={item.href} title={item.title}>
              <CardBase withShadow liftUp className={classes.cardBase}>
                <>
                  <Image
                    src={themeMode === 'light' ? item.cover : item.coverDark}
                    alt={item.title}
                  />
                  <div className={classes.linkContainer}>
                    <Typography variant="subtitle1" color="textPrimary" className={classes.title}>
                      {item.title}
                    </Typography>
                    <ChevronRightIcon />
                  </div>
                </>
              </CardBase>
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Pages;
