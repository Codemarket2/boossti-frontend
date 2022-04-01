import * as React from 'react';
import { useMemo } from 'react';
import { useEffect, useReducer, useState } from 'react';
import DataGrid, { Column, SelectColumn, TextEditor } from 'react-data-grid';
import { CellExpanderFormatter } from './CellExpanderFormatter';
import DisplayValue from '../form2/DisplayValue';
interface IDataTable {
  form: any;
  data: any;
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
  data,
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
}: IDataTable) => {
  const [colm, setColm] = useState([]);

  useEffect(() => {
    setColm(createColm(form));
  }, [form]);
  function toggleSubRow(rows, id) {
    const rowIndex = rows.findIndex((r) => r.id === id);
    const row = rows[rowIndex];
    if (!row?.children) return rows;
    else {
      const { children } = row;

      const newRows = [...rows];
      newRows[rowIndex] = { ...row, isExpanded: !row.isExpanded };
      if (!row.isExpanded) {
        newRows.splice(rowIndex + 1, 0, ...children);
      } else {
        newRows.splice(rowIndex + 1, children.length);
      }
      return newRows;
    }
  }
  function reducer(rows, { type, id }: Action) {
    switch (type) {
      case 'toggleSubRow':
        return toggleSubRow(rows, id);
      default:
        return rows;
    }
  }

  const createColm = (form) => {
    const arr = [
      SelectColumn,
      { key: 'id', name: 'S.No', resizable: true, frozen: true, width: 60 },
    ];

    form?.fields?.map((e) => {
      // console.log('e', e);
      const temp = e?.options?.multipleValues
        ? {
            key: '',
            name: '',
            resizable: true,
            frozen: false,
            formatter({ row, isCellSelected }) {
              const hasChildren = row.children !== undefined;
              const style = !hasChildren ? { marginInlineStart: 30 } : undefined;
              return (
                <>
                  {hasChildren && (
                    <CellExpanderFormatter
                      isCellSelected={isCellSelected}
                      expanded={row.isExpanded === true}
                      onCellExpand={() => dispatch({ id: row.id, type: 'toggleSubRow' })}
                    />
                  )}
                  <div>
                    <div style={style}>{row[e._id]}</div>
                  </div>
                </>
              );
            },
          }
        : {
            key: '',
            name: '',
            resizable: true,
            frozen: false,
            editor: TextEditor,
          };
      temp.key = e._id;
      temp.name = e.label;
      arr.push(temp);
    });
    return arr;
  };

  const columns: Column<any>[] = useMemo(() => {
    const arr = [
      SelectColumn,
      { key: 'id', name: 'S.No', resizable: true, frozen: true, width: 60 },
    ];

    form?.fields?.map((e) => {
      // console.log('e: ', e);
      const temp = e?.options?.multipleValues
        ? {
            key: '',
            name: '',
            resizable: true,
            frozen: false,
            formatter({ row, isCellSelected }) {
              const hasChildren = row.children !== undefined;
              const style = !hasChildren ? { marginInlineStart: 30 } : undefined;
              console.log({ Fieldtype: e.fieldType, Value: row[e._id] });

              return (
                <>
                  {hasChildren && (
                    <CellExpanderFormatter
                      isCellSelected={isCellSelected}
                      expanded={row.isExpanded === true}
                      onCellExpand={() => dispatch({ id: row.id, type: 'toggleSubRow' })}
                    />
                  )}
                  <div>
                    <div style={style}>
                      <DisplayValue field={e} value={row[e._id]} />
                    </div>
                  </div>
                </>
              );
            },
          }
        : {
            key: '',
            name: '',
            resizable: true,
            frozen: false,
            editor: TextEditor,
            formatter({ row }) {
              return <DisplayValue field={e} value={row[e._id]} />;
            },
          };
      temp.key = e._id;
      temp.name = e.label;
      arr.push(temp);
    });
    return arr;
  }, []);

  const [rowsf, dispatch] = useReducer(reducer, rows);

  return (
    <div style={{ height: 720, width: '100%' }}>
      <div style={{ height: 720, width: '100%' }}>
        <DataGrid
          rows={rowsf}
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
