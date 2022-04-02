import React, { useState } from 'react';

import { styled } from '@mui/material/styles';

import { Theme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


import PaletteIcon from '@mui/icons-material/Palette';
import FontIcon from '@mui/icons-material/FontDownload';
import TypographyIcon from '@mui/icons-material/TextFields';
import SnippetsIcon from '@mui/icons-material/PlaylistAdd';
import TypographyTools from './TypographyTools/TypographyTools';
import PaletteTools from './PaletteTools/PaletteTools';
import ToolPanel from './ToolPanel';
import FontTools from './FontTools/FontTools';
import SnippetTools from './SnippetTools';

const PREFIX = 'ThemeTools';

const classes = {
  themeToolsRoot: `${PREFIX}-themeToolsRoot`,
  themeToolsBottomNavBar: `${PREFIX}-themeToolsBottomNavBar`,
  selected: `${PREFIX}-selected`,
  wrapper: `${PREFIX}-wrapper`,
  root: `${PREFIX}-root`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.themeToolsRoot}`]: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
  },

  [`& .${classes.themeToolsBottomNavBar}`]: {
    backgroundColor: theme.palette.background.default,
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
    width: 'calc(100% - 1px)', // to prevent scroll bar
  },

  [`& .${classes.selected}`]: {
    // color: "#fff",
    '&$root': {
      backgroundColor: '#212121',
    },
    '& $wrapper': {
      color: '#fff',
    },
  },

  [`& .${classes.wrapper}`]: {
    color: theme.palette.text.disabled,
  },

  [`& .${classes.root}`]: {},
}));

export const paletteToolsId = 'palette-tools-nav';
export const fontToolsId = 'font-tools-nav';
export const typographyToolsId = 'typography-tools-nav';
export const snippetToolsId = 'snippet-tools-nav';

const toolPanels: Array<{
  label: string;
  icon: React.ReactNode;
  tools: any;
  id: string;
}> = [
  {
    label: 'Palette',
    icon: <PaletteIcon />,
    tools: PaletteTools,
    id: paletteToolsId,
  },
  {
    label: 'Fonts',
    icon: <FontIcon />,
    tools: FontTools,
    id: fontToolsId,
  },
  {
    label: 'Typography',
    icon: <TypographyIcon />,
    tools: TypographyTools,
    id: typographyToolsId,
  },
  {
    label: 'Snippets',
    icon: <SnippetsIcon />,
    tools: SnippetTools,
    id: snippetToolsId,
  },
];

export default function ThemeTools() {
  const [bottomNavIndex, setBottomNavIndex] = useState(0);

  const bottomNavActionClasses = {
    selected: classes.selected,
    wrapper: classes.wrapper,
    root: classes.root,
  };

  const currentTool = toolPanels[bottomNavIndex];

  return (
    <Root className={classes.themeToolsRoot}>
      <ToolPanel panelTitle={currentTool.label}>
        <currentTool.tools />
      </ToolPanel>

      <BottomNavigation
        value={bottomNavIndex}
        showLabels
        className={classes.themeToolsBottomNavBar}
        onChange={(event, newValue) => setBottomNavIndex(newValue)}
      >
        {toolPanels.map((panel, index) => (
          <BottomNavigationAction
            key={`${index}-${panel.label}`}
            id={panel.id}
            label={panel.label}
            value={index}
            icon={panel.icon}
            classes={bottomNavActionClasses}
          />
        ))}
      </BottomNavigation>
    </Root>
  );
}
