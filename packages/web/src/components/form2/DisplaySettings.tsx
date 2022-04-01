import { useState, useEffect, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import { Tooltip, Box } from '@mui/material';
import type { Column } from 'react-data-grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import WorkFlowView from './WorkFlowView';

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

function toggleSubRow(rows: Row2[], id: string): Row2[] {
  const rowIndex = rows.findIndex((r) => r.id === id);
  const row = rows[rowIndex];
  const { children } = row;
  if (!children) return rows;
  const newRows = [...rows];
  newRows[rowIndex] = { ...row, isExpanded: !row.isExpanded };
  if (!row.isExpanded) {
    newRows.splice(rowIndex + 1, 0, ...children);
  } else {
    newRows.splice(rowIndex + 1, children.length);
  }
  // console.log({ newRows }, 'kyle returned');
  return newRows;
}

export default function TreeView({ field, treeDepth }: IProps) {
  const trows = useCreateRows(field, treeDepth);
  const [rows, setRows] = useState(trows);
  useEffect(() => {
    setRows(trows);
  }, [field]);
  const columns: Column<Row2>[] = useMemo(() => {
    return [
      {
        key: 'widgets',
        name: 'settings',
        formatter({ row, isCellSelected }: any) {
          const hasChildren = row.children !== undefined;
          const style = { marginInlineStart: 5 * (1 + row.treeDepth) };
          return (
            <>
              <ListItem style={style}>
                <Tooltip title={row.name}>
                  <ListItemText primary={row.name} />
                </Tooltip>
                <ListItemSecondaryAction hidden={!hasChildren}>
                  <IconButton
                    onClick={() => {
                      const newR = toggleSubRow(rows, row.id);
                      setRows(newR);
                    }}
                    size="large"
                  >
                    {row.isExpanded ? '\u25BC' : '\u25B6'}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          );
        },
      },
    ];
  }, [rows]);

  return (
    <>
      <DataGrid
        style={{ height: !rows || rows.length === 0 ? undefined : rows.length * 35 + 5 }}
        headerRowHeight={0}
        columns={columns}
        rows={rows}
      />
      <WorkFlowView field={field} treeDepth={treeDepth ? treeDepth + 1 : 1} />
    </>
  );
}

export const useCreateRows = (field: any, ITreeDepth = 0) => {
  let { settings } = field.options;
  const widgetTypes = {
    both: 'Display form & responses',
    form: 'Display only form',
    responses: 'Display only responses',
  };
  const formViewTypes = {
    fullForm: 'Full Form',
    oneField: 'One field at a time',
    leaderboard: 'Leaderboad',
    button: 'Button',
    selectItem: 'Select Item',
  };

  const whoCanSubmitTypes = {
    all: 'All users',
    authUser: 'Authenticated users',
    onlyPageOwner: 'Only page owner',
  };
  const responseViewTypes = {
    button: 'Button',
    table: 'Table',
    vertical: 'Vertical',
  };
  const whoCanSeeResponsesTypes = {
    all: 'Both authenticated & unauthenticated users',
    authUser: 'Only Authenticated users',
    onlyPageOwner: 'Only page owner',
  };
  const trows: Row2[] = [];
  if (settings === undefined) settings = {};
  const {
    formView,
    minValue,
    maxValue,
    buttonLabel,
    selectItemField,
    whoCanSubmit,
    viewAuthRequired,
    multipleResponses,
    widgetType,
    editResponse,
    whoCanViewResponses,
    onlyMyResponses,
    actions,
    showFormTitle,
  } = settings;
  trows.push({
    id: '1',
    name: widgetTypes[widgetType] || widgetTypes.both,
    treeDepth: 0,
  });
  if (widgetType !== 'responses') {
    trows.push({
      id: '2',
      name: formViewTypes[settings?.formView] || formViewTypes.fullForm,
      treeDepth: 0,
    });
    if (formView === 'leaderboard') {
      trows.push({
        id: '3',
        name: 'Leaderboard Settings',
        treeDepth: 0,
        children: [
          {
            id: '4',
            name: `Min Value ${minValue}`,
            treeDepth: 1,
            parentId: '3',
          },
          {
            id: '5',
            name: `Max Value ${maxValue}`,
            treeDepth: 1,
            parentId: '3',
          },
        ],
      });
    }
    if (formView === 'button') {
      trows.push({
        id: '6',
        name: `ButtonLabel: ${buttonLabel || 'Not Set'}`,
        treeDepth: 0,
      });
    }
    if (formView === 'selectItem') {
      trows.push({
        id: '7',
        name: `selectItem: ${selectItemField || 'Not Set'}`,
        treeDepth: 0,
      });
    }
    trows.push({
      id: '8',
      name: `Who can submit: ${whoCanSubmitTypes[whoCanSubmit] || whoCanSubmitTypes.all}`,
      treeDepth: 0,
    });
    if (viewAuthRequired) {
      trows.push({
        id: '10',
        name: `Authentication required to view form`,
        treeDepth: 0,
      });
    }
    if (multipleResponses) {
      trows.push({
        id: '11',
        name: `Multiple responses allowed`,
        treeDepth: 0,
      });
    }
    if (editResponse) {
      trows.push({
        id: '12',
        name: `Edit response`,
        treeDepth: 0,
      });
    }
  }
  if (widgetType !== 'form') {
    trows.push(
      {
        id: '13',
        name: `ResponseView: ${
          responseViewTypes[settings?.responsesView] || responseViewTypes.button
        }`,
        treeDepth: 0,
      },
      {
        id: '14',
        name: `Response Visibility: \n ${
          whoCanSeeResponsesTypes[whoCanViewResponses] || whoCanSeeResponsesTypes.all
        }`,
        treeDepth: 0,
      },
    );
    if (onlyMyResponses) {
      trows.push({
        id: '15',
        name: `Users can view only their own responses`,
        treeDepth: 0,
      });
    }
  }
  if (showFormTitle) {
    trows.push({
      id: '16',
      name: `Show form title`,
      treeDepth: 0,
    });
  }
  if (actions) {
    trows.push({
      id: '17',
      name: `Actions`,
      treeDepth: 0,
      children: actions.map((action, index) => ({
        id: `${index + 100}`,
        name: `${action.name}`,
        treeDepth: 1,
        parentId: '17',
      })),
    });
  }

  return trows;
};
