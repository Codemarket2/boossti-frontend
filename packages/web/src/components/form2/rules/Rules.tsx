import React, { useState } from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
import { IRule } from '@frontend/shared/types/rules';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Close from '@mui/icons-material/Close';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import RuleBuilder from './RuleBuilder';

interface IRulesProps {
  onClose: () => void;
  rules: IRule[];
  onRulesChange: (newRules: IRule[]) => void;
}

const initialState = {
  showForm: false,
  selectedRule: null,
  ruleIndex: null,
  showMenu: null,
};

export default function Rules({ onClose, rules = [], onRulesChange }: IRulesProps) {
  const [state, setState] = useState(initialState);

  const deleteRule = () => {
    onRulesChange([]);
    // onRulesChange(rules?.filter((r, index) => index !== state.ruleIndex));
    setState(initialState);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box>
          Rules
          <Tooltip title="Add new rule">
            <IconButton
              color="primary"
              onClick={() => setState((oldState) => ({ ...oldState, showForm: true }))}
            >
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Box>
        {onClose && (
          <Tooltip title="Close Rules">
            <IconButton onClick={onClose} edge="end">
              <Close />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
      {state.showForm && (
        <RuleBuilder
          initialRule={state.selectedRule}
          onSave={(newRule) => {
            let newRules = [...rules];
            if (state.ruleIndex) {
              newRules = newRules?.map((r, i) => (i === state.ruleIndex ? newRule : r));
            } else {
              newRules.push(newRule);
            }
            onRulesChange(newRules);
            setState(initialState);
          }}
          onClose={() => setState((oldState) => ({ ...oldState, showForm: false }))}
        />
      )}
      <List>
        {rules?.map((rule, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${rule?.ruleType} ${rule?.trigger}`} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={(e) =>
                  setState((oldState) => ({
                    ...oldState,
                    ruleIndex: index,
                    selectedRule: rule,
                    showMenu: e.currentTarget,
                  }))
                }
              >
                <MoreHoriz />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {state.showMenu && (
        <Menu
          anchorEl={state.showMenu}
          open={state.showMenu}
          onClose={() => setState(initialState)}
        >
          <MenuItem
            onClick={() =>
              setState((oldState) => ({ ...oldState, showMenu: null, showForm: true }))
            }
          >
            Edit
          </MenuItem>
          <MenuItem onClick={deleteRule}>Delete</MenuItem>
        </Menu>
      )}
    </Box>
  );
}
