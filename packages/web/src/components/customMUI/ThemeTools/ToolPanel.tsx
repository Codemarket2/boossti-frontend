import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';

const PREFIX = 'ToolPanel';

const classes = {
  toolPanel: `${PREFIX}-toolPanel`,
  toolPanelTitle: `${PREFIX}-toolPanelTitle`,
  toolPanelContent: `${PREFIX}-toolPanelContent`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.toolPanel}`]: {
    flexGrow: 1,
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  [`& .${classes.toolPanelTitle}`]: {
    paddingLeft: 16,
    paddingRight: 16,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: '1px solid grey',
  },

  [`& .${classes.toolPanelContent}`]: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

export const toolPanelId = 'theme-tool-panel';

function ToolPanel({ panelTitle, children }) {
  return (
    <Root id={toolPanelId} className={classes.toolPanel}>
      <div className={classes.toolPanelTitle}>
        <Typography variant="overline">{panelTitle}</Typography>
      </div>
      <div className={classes.toolPanelContent}>{children}</div>
    </Root>
  );
}

export default ToolPanel;
