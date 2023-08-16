import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Tooltip, Theme, Accordion, AccordionSummary, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import { setThemeOptions, removeThemeOptions } from "../../../../../../shared/redux/actions/muiActions"
import { removeThemeOption, setThemeOption } from '@frontend/shared/redux/actions/setting';
import { ThemeValueChangeEvent } from '../events';
import { updateRemoveThemeOptions, updateSetThemeOptions } from '../../commonFunc';
import { getByPath } from '../../utils';
import { SnippetModification } from './types';

const PREFIX = 'SnippetItem';

const classes = {
  snippetTitle: `${PREFIX}-snippetTitle`,
};

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  [`& .${classes.snippetTitle}`]: {
    marginLeft: theme.spacing(),
    flexGrow: 1,
  },
}));

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
    <StyledAccordion
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
          <Tooltip title={toolTipContent} arrow>
            <InfoOutlinedIcon />
          </Tooltip>
        )}
      </AccordionSummary>
    </StyledAccordion>
  );
};

export default SnippetItem;
