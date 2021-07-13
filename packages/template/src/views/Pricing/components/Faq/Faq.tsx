import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, ListItem, ListItemText } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  fontWeightBold: {
    fontWeight: 'bold',
  },
  faqTitle: {
    display: 'block',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Faq = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Frequently asked questions"
        titleProps={{
          className: classes.fontWeightBold,
        }}
      />
      <Grid container spacing={isMd ? 4 : 0}>
        {data.map((item: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ListItem disableGutters key={index} data-aos="fade-up">
              <ListItemText
                primary={item.title}
                secondary={item.text}
                primaryTypographyProps={{
                  variant: 'h6',
                  className: clsx(classes.fontWeightBold, classes.faqTitle),
                }}
                secondaryTypographyProps={{
                  variant: 'subtitle1',
                  color: 'textPrimary',
                }}
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Faq;
