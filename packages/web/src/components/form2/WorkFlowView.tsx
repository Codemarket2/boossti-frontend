import { useGetSection } from '@frontend/shared/hooks/section';
import { useState, useEffect, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import { List, Paper, Typography } from '@material-ui/core';
import type { Column } from 'react-data-grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DisplaySettings from './DisplaySettings';

interface Row2 {
  id: string;
  name: string;
  treeDepth: number;
  children?: Row2[];
  parentId?: string;
  isExpanded?: boolean;
  rowHeight?: number;
}

interface IProps {
  field?: any;
  treeDepth?: number;
}

export default function WorkFlowView({ field, treeDepth }: IProps) {
  const { data, error } = useGetSection(field?.options.settings?.customSectionId);
  const [isExpanded, setIsExpanded] = useState<boolean[]>([]);
  const [rexpanded, setRexpanded] = useState(false);
  if (error || !data) return <></>;
  const section = data.getSection;

  return (
    <>
      <div style={{ marginInlineStart: 10 }}>
        <ListItem button>
          <ListItemText primary={'Response Section'} />
          <ListItemSecondaryAction>
            <IconButton
              edge="start"
              onClick={(event) => {
                setRexpanded(!rexpanded);
              }}
            >
              {rexpanded ? '\u25BC' : '\u25B6'}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {rexpanded && (
          <List style={{ marginInlineStart: 10 }}>
            {section !== undefined &&
              section.fields?.map((f: any, index: any) => {
                const expanded = isExpanded[index] || false;
                return (
                  <div>
                    <ListItem button>
                      <ListItemText primary={f.label} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="start"
                          onClick={(event) => {
                            setIsExpanded({
                              ...isExpanded,
                              [index]: !expanded,
                            });
                          }}
                        >
                          {expanded ? '\u25BC' : '\u25B6'}
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {f?.fieldType === 'form' && expanded && (
                      <DisplaySettings field={f} treeDepth={treeDepth + 2} />
                    )}
                  </div>
                );
              })}
          </List>
        )}
      </div>
    </>
  );
}
