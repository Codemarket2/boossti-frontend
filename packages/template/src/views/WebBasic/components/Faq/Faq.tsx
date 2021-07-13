import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  colors,
} from '@material-ui/core';
import { SectionHeader, IconAlternate } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    alignSelf: 'flex-start',
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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={isMd ? 4 : 2}>
            {data.map((item: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ListItem disableGutters key={index} data-aos="fade-up">
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <IconAlternate
                      size="small"
                      shape="circle"
                      fontIconClass={'fas fa-question'}
                      color={colors.amber}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.text}
                    primaryTypographyProps={{
                      variant: 'h6',
                    }}
                    secondaryTypographyProps={{
                      variant: 'subtitle1',
                    }}
                  />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SectionHeader
            title="Get TheFront and save your time."
            subtitle="Build a beautiful, modern website with flexible, fully customizable, atomic Material UI components."
            align="center"
            ctaGroup={[
              <Button color="primary" variant="contained" size="large">
                Buy it now
              </Button>,
            ]}
            disableGutter
            data-aos="fade-up"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Faq;
