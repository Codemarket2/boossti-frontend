import { useGetSection } from '@frontend/shared/hooks/section';
import { useState } from 'react';
import { List, Paper, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
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
          <ListItemText style={{ marginInlineStart: 5 }} primary="WorkFlows" />
          <ListItemSecondaryAction>
            <IconButton
              edge="start"
              onClick={(event) => {
                setRexpanded(!rexpanded);
              }}
              size="large"
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
                          size="large"
                        >
                          {expanded ? '\u25BC' : '\u25B6'}
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {expanded && <DisplaySettings field={f} treeDepth={treeDepth + 2} />}
                  </div>
                );
              })}
          </List>
        )}
      </div>
    </>
  );
}
