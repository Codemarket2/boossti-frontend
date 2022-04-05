import * as React from 'react';
import { useMemo, useCallback, useEffect, useReducer, useState } from 'react';
import DataGrid, { Column, SelectColumn, TextEditor } from 'react-data-grid';
import { ListItem, Tooltip } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { CellExpanderFormatter } from './CellExpanderFormatter';
import DisplayValue from '../form2/DisplayValue';
import ResponseActions from './ResponseActions';
import IconButton from '@mui/material/IconButton';
import { flushSync } from 'react-dom';

interface IDataTable {
  form: any;
  data: any;
  refetch: any;
  rows: any;
  rowHeight: any;
  onRowsChange: any;
  rowKeyGetter: any;
  selectedRows: any;
  onSelectedRowsChange: any;
  onFill: any;
  onCopy: any;
  onPaste: any;
  direction: any;
}
interface Action {
  type: 'toggleSubRow' | 'deleteSubRow';
  id: string;
}

export const DataTable = ({
  form,
  refetch,
  rows,
  rowHeight,
  onRowsChange,
  rowKeyGetter,
  selectedRows,
  onSelectedRowsChange,
  onFill,
  onCopy,
  onPaste,
  direction,
  data,
}: IDataTable) => {
  const trows = createRows(data, form);
  const [frows, setfRows] = useState(trows);
  useEffect(() => {
    setfRows(trows);
  }, [data]);
  function toggleSubRow(row_index, field_index) {
    const rows = trows;
    const row = rows[row_index];
    if (!row?.fields) return rows;
    else {
      const { fields } = row;
      const field = fields[field_index];
      if (!field) return rows;
      const { children } = field;
      if (!children) return rows;
      const newRows = [...rows];
      const state = frows[row_index]?.fields[field_index]?.isExpanded;
      const rowState = frows[row_index]?.expanded;
      newRows[row_index] = {
        ...row,
        expanded: !rowState,
        fields: fields.map((f, i) => {
          if (i === field_index) {
            return {
              ...f,
              isExpanded: !state,
            };
          } else return f;
        }),
      };
      if (!state) {
        newRows.splice(row_index + 1, 0, ...children);
      }
      return newRows;
    }
  }

  const columns: Column<any>[] = useMemo(() => {
    const arr = [
      SelectColumn,
      { key: 'id', name: 'S.No', resizable: true, frozen: true, width: 40 },
      {
        key: 'action',
        name: 'Action',
        resizable: false,
        frozen: false,
        width: 120,
        formatter({ row }) {
          const { action: response } = row;
          if (!response) return null;
          return <ResponseActions response={response} form={form} refetch={refetch} />;
        },
      },
    ];
    form?.fields?.map((e) => {
      const temp = {
        key: '',
        name: '',
        resizable: true,
        frozen: false,
        formatter({ row, isCellSelected }) {
          const index = row.fields?.findIndex((c) => c._id === e._id);
          if (index === -1 || !row?.fields) {
            return <div></div>;
          }
          const rowIndex = frows.findIndex((r) => r.id === row.id);
          const value = row?.fields[index];
          const multipleValues = value?.multipleValues;
          const hasChildren = value.children !== undefined;
          const style = !hasChildren ? { marginInlineStart: 30 } : undefined;
          return (
            <>
              <div style={multipleValues ? { marginRight: '30px', overflow: 'hidden' } : null}>
                <DisplayValue field={e} value={value} />
              </div>
              <IconButton
                hidden={!multipleValues}
                style={{
                  padding: 0,
                  width: 30,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                onClick={() => {
                  const newR = toggleSubRow(rowIndex, index);
                  // console.log({ newR }, 'kennyb setted');
                  setfRows(newR);
                }}
                size="large"
              >
                {value?.isExpanded ? '\u25BC' : '\u25B6'}
              </IconButton>
            </>
          );
        },
      };
      temp.key = e._id;
      temp.name = e.label;
      arr.push(temp);
    });
    return arr;
  }, [frows]);

  return (
    <div style={{ height: 720, width: '100%' }}>
      <div style={{ height: 720, width: '100%' }}>
        <DataGrid
          rows={frows}
          columns={columns}
          rowHeight={rowHeight}
          onRowsChange={onRowsChange}
          rowKeyGetter={rowKeyGetter}
          selectedRows={selectedRows}
          onSelectedRowsChange={onSelectedRowsChange}
          onFill={onFill}
          onCopy={onCopy}
          onPaste={onPaste}
          className="fill-grid"
          direction={direction}
        />
      </div>
    </div>
  );
};

const createRows = (data, form) => {
  const rows = [];

  data?.getResponses?.data?.map((e, i) => {
    //group rows by e.fieldId

    const tid = `${i + 1}`;
    const temp = { id: tid, action: e, fields: [] };
    const tr = {};
    let sameFieldCount = 1;
    form?.fields.map((f) => {
      const val = e?.values?.filter((v) => v.field === f._id && v.value !== '');
      if (val?.length == 1) {
        const v = val[0];
        const t = {
          _id: f._id,
          label: f.label,
          multipleValues: false,
          value: v.value,
        };
        temp.fields.push(t);
      } else if (val?.length > 1) {
        const t = {
          _id: f._id,
          label: f.label,
          value: 'expand',
          multipleValues: true,
          expanded: false,
          children: val.map((v) => {
            return {
              id: '',
              parentId: f._id,
              fields: [
                {
                  _id: f._id,
                  label: f.label,
                  multipleValues: false,
                  value: v.value,
                },
              ],
            };
          }),
        };
        temp.fields.push(t);
      }
    });
    rows.push(temp);
  });
  return rows;
};
