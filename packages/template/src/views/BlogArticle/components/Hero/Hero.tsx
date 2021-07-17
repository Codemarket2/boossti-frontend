import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';
import { Section, Parallax } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: 'white',
    overflow: 'hidden',
  },
  sectionWrapper: {
    height: 400,
    backgroundColor: '#003c0580',
  },
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
  section: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemAvatar: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    height: 60,
    width: 60,
  },
}));

const Hero = ({
  className,
  cover,
  title,
  subtitle,
  author,
  ...rest
}: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Parallax backgroundImage={cover.src}>
        <div className={classes.sectionWrapper}>
          <Section className={classes.section}>
            <>
              <SectionHeader
                title={title}
                subtitle={subtitle}
                align="left"
                data-aos="fade-up"
                titleProps={{
                  className: clsx(classes.title, classes.textWhite),
                  variant: 'h3',
                }}
                subtitleProps={{
                  className: classes.textWhite,
                }}
              />
              <List disablePadding>
                <ListItem disableGutters>
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Avatar {...author.photo} alt={author.name} className={classes.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Published by ${author.name}`}
                    secondary={`on ${author.date}`}
                    primaryTypographyProps={{
                      className: classes.textWhite,
                      variant: 'subtitle1',
                    }}
                    secondaryTypographyProps={{
                      className: classes.textWhite,
                      variant: 'subtitle1',
                    }}
                  />
                </ListItem>
              </List>
            </>
          </Section>
        </div>
      </Parallax>
    </div>
  );
};

export default Hero;
