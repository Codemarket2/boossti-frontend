import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Theme,
  createTheme,
  adaptV4Theme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import PaletteInput from './PaletteInput';
import { getThemeValueInfo } from '../../selectors/selectors';

const PREFIX = 'PaletteSubType';

const classes = {
  title: `${PREFIX}-title`,
  accordionDetails: `${PREFIX}-accordionDetails`,
  thumbnailContainer: `${PREFIX}-thumbnailContainer`,
  colorThumbnail: `${PREFIX}-colorThumbnail`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.title}`]: {
    textTransform: 'capitalize',
  },

  [`& .${classes.accordionDetails}`]: {
    flexDirection: 'column',
    '&> *': {
      marginBottom: theme.spacing(2),
    },
  },

  [`& .${classes.thumbnailContainer}`]: {
    display: 'flex',
    alignSelf: 'stretch',
  },

  [`& .${classes.colorThumbnail}`]: {
    height: '100%',
    width: 15,
    marginLeft: 4,
    border: '1px solid grey',
  },
}));

interface PaletteSubTypeProps {
  title: string;
  path: string;
  paletteValues: [string, string][]; // [name, path]
}

export default function PaletteSubType({ title, path, paletteValues }: PaletteSubTypeProps) {
  // const themeValues = useThemeValue(path)
  const initialTheme = useSelector(({ setting }: any) => setting);
  const themeOptions = createTheme(adaptV4Theme(initialTheme.theme));
  const themeValues = getThemeValueInfo(path, themeOptions, initialTheme.theme).value;

  return (
    <Root>
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
    </Root>
  );
}
