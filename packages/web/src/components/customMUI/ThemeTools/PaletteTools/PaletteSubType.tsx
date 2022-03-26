import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  makeStyles,
  createStyles,
  AccordionDetails,
  Theme,
  createMuiTheme,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PaletteInput from './PaletteInput';
import { getThemeValueInfo } from '../../selectors/selectors';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textTransform: 'capitalize',
    },
    accordionDetails: {
      flexDirection: 'column',
      '&> *': {
        marginBottom: theme.spacing(2),
      },
    },
    thumbnailContainer: {
      display: 'flex',
      alignSelf: 'stretch',
    },
    colorThumbnail: {
      height: '100%',
      width: 15,
      marginLeft: 4,
      border: '1px solid grey',
    },
  }),
);

interface PaletteSubTypeProps {
  title: string;
  path: string;
  paletteValues: [string, string][]; // [name, path]
}

export default function PaletteSubType({ title, path, paletteValues }: PaletteSubTypeProps) {
  const classes = useStyles();
  // const themeValues = useThemeValue(path)
  const initialTheme = useSelector(({ setting }: any) => setting);
  const themeOptions = createMuiTheme(initialTheme.theme);
  const themeValues = getThemeValueInfo(path, themeOptions, initialTheme.theme).value;

  return (
    <>
      <Accordion style={{ margin: '0px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.title} variant="body2">
            {title}
          </Typography>
          <div className={classes.thumbnailContainer}>
            {paletteValues.map(([name, subPath]) => (
              <div
                key={name}
                className={classes.colorThumbnail}
                style={{ backgroundColor: themeValues?.[subPath] }}
              />
            ))}
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {paletteValues.map(([name, subPath]) => (
            <PaletteInput key={`${title}-${name}`} label={name} path={`${path}.${subPath}`} />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
