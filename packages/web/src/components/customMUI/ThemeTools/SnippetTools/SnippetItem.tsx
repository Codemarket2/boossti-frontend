import React, { useCallback } from 'react';
import { SnippetModification } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { getByPath } from '../../utils';
import {
  Link,
  Tooltip,
  makeStyles,
  Theme,
  createStyles,
  Accordion,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
// import { setThemeOptions, removeThemeOptions } from "../../../../../../shared/redux/actions/muiActions"
import { ThemeValueChangeEvent } from '../events';
import { updateRemoveThemeOptions, updateSetThemeOptions } from '../../commonFunc';
import { removeThemeOption, setThemeOption } from '@frontend/shared/redux/actions/setting';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snippetTitle: {
      marginLeft: theme.spacing(),
      flexGrow: 1,
    },
  }),
);

/**
 * Simple check of if the SnippetModification.configs are
 * set on the current theme options
 * @param configs
 */
const useIsSnippetIncluded = (configs: SnippetModification['configs']) => {
  const initialTheme = useSelector(({ setting }: any) => setting.theme);
  for (const c in configs) {
    if (getByPath(initialTheme, configs[c].path) == null) {
      return false;
    }
  }
  return true;
};

const SnippetItem = ({ snippet }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const handleAddSnippet = useCallback(() => {
  //   dispatch(setThemeOptions(snippet.configs))
  // }, [dispatch])

  // const handleRemoveSnippet = useCallback(() => {
  //   dispatch(removeThemeOptions(snippet.configs))
  //   document.dispatchEvent(ThemeValueChangeEvent())
  // }, [dispatch])

  const handleAddSnippet = () => {
    const updateTheme = updateSetThemeOptions(snippet.configs);
    dispatch(setThemeOption(updateTheme));
    document.dispatchEvent(ThemeValueChangeEvent());
  };
  const handleRemoveSnippet = () => {
    const updateTheme = updateRemoveThemeOptions(snippet.configs);
    dispatch(removeThemeOption(updateTheme));
    document.dispatchEvent(ThemeValueChangeEvent());
  };

  const isSnippetIncluded = useIsSnippetIncluded(snippet.configs);

  const { info, docs, title } = snippet;
  const toolTipContent = info && (
    <div>
      <div>{info}</div>
      {docs && <Link href={docs} target="_blank" rel="noreferrer">{`Theme ${title} Docs`}</Link>}
    </div>
  );
  return (
    <Accordion
      disabled={isSnippetIncluded}
      onClick={isSnippetIncluded ? handleRemoveSnippet : handleAddSnippet}
      style={{ margin: '0px' }}
    >
      <AccordionSummary>
        {isSnippetIncluded ? <RemoveIcon /> : <AddIcon />}
        <Typography variant="body2" className={classes.snippetTitle}>
          {title}
        </Typography>
        {info && (
          <Tooltip title={toolTipContent} interactive arrow>
            <InfoOutlinedIcon />
          </Tooltip>
        )}
      </AccordionSummary>
    </Accordion>
  );
};

export default SnippetItem;
