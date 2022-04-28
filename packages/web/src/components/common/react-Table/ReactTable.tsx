import React, { useState } from 'react';
import {
  useTable,
  usePagination,
  useColumnOrder,
  useBlockLayout,
  useResizeColumns,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Box, TableFooter } from '@mui/material';
import Typography from '@mui/material/Typography';
import makeData from './makeData';
import Pagination from './Pagination';
import EditTable from './EditTable';
// import generateExcel from "zipcelx";

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      id="standard-basic"
      variant="standard"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((val) => {
    setGlobalFilter(val || undefined);
  }, 200);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>Search</Typography>
      <TextField
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        id="filled-basic"
        variant="filled"
        label={`${count} records...`}
      />
    </Box>
  );
}

// Be sure to pass our updateMyData and the skipPageReset option
function ReactTable({ columns, data, updateMyData, skipPageReset }) {
  const [records, setRecords] = useState(data);
  const [editTable, setEditTable] = useState({ resizeColumn: false, allowFilter: false });

  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const getRowId = React.useCallback((row) => {
    return row.id;
  }, []);

  function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  // // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: EditableCell,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    getToggleHideAllColumnsProps,
    allColumns,
    setColumnOrder,
    visibleColumns,
    resetResizing,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data: records,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      getRowId,
      updateMyData,
    },
    useGlobalFilter,
    useFilters,
    usePagination,
    useColumnOrder,
    useBlockLayout,
    useResizeColumns,
  );

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      }),
    );
  };

  // function getHeader(column) {
  //   if (column.totalHeaderCount === 1) {
  //     return [
  //       {
  //         value: column.Header,
  //         type: "string"
  //       }
  //     ];
  //   } else {
  //     const span = [...Array(column.totalHeaderCount - 1)].map(x => ({
  //       value: "",
  //       type: "string"
  //     }));
  //     return [
  //       {
  //         value: column.Header,
  //         type: "string"
  //       },
  //       ...span
  //     ];
  //   }
  // }

  // function getExcel() {
  //   const config = {
  //     filename: "general-ledger-Q1",
  //     sheet: {
  //       data: []
  //     }
  //   };

  //   const dataSet = config.sheet.data;

  //   // review with one level nested config
  //   // HEADERS
  //   headerGroups.forEach(headerGroup => {
  //     const headerRow = [];
  //     if (headerGroup.headers) {
  //       headerGroup.headers.forEach(column => {
  //         headerRow.push(...getHeader(column));
  //       });
  //     }

  //     dataSet.push(headerRow);
  //   });

  //   // FILTERED ROWS
  //   if (rows.length > 0) {
  //     rows.forEach(row => {
  //       const dataRow = [];

  //       Object.values(row.values).forEach(value =>
  //         dataRow.push({
  //           value,
  //           type: typeof value === "number" ? "number" : "string"
  //         })
  //       );

  //       dataSet.push(dataRow);
  //     });
  //   } else {
  //     dataSet.push([
  //       {
  //         value: "No data",
  //         type: "string"
  //       }
  //     ]);
  //   }

  //   return generateExcel(config);
  // }

  // Render the UI for your table
  return (
    <>
      <EditTable
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        allColumns={allColumns}
        setColumnOrder={setColumnOrder}
        visibleColumns={visibleColumns}
        resetResizing={resetResizing}
        editTable={editTable}
        setEditTable={setEditTable}
      />
      <DndProvider backend={HTML5Backend}>
        <TableContainer component={Paper}>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>
                      {column.render('Header')}
                      {editTable.resizeColumn && (
                        <Box
                          {...column.getResizerProps()}
                          sx={{
                            display: 'inline-block',
                            background: 'blue',
                            width: '4px',
                            height: '100%',
                            position: 'absolute',
                            right: '0',
                            top: '0',
                            transform: 'translateX(50%)',
                            zIndex: '1',
                            touchAction: 'none',
                          }}
                        />
                      )}
                      {editTable.allowFilter && (
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {editTable.allowFilter && (
                <TableRow>
                  <TableHead>
                    <GlobalFilter
                      preGlobalFilteredRows={preGlobalFilteredRows}
                      globalFilter={globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </TableHead>
                </TableRow>
              )}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map(
                (row, i) =>
                  prepareRow(row) || (
                    <Row index={i} row={row} moveRow={moveRow} {...row.getRowProps()} />
                  ),
              )}
            </TableBody>
            <TableFooter>
              {footerGroups.map((group) => (
                <TableRow {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <TableCell {...column.getFooterProps()}>{column.render('Footer')}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </TableContainer>
      </DndProvider>
      <Pagination
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        canNextPage={canNextPage}
      />
    </>
  );
}

const DND_ITEM_TYPE = 'row';

const Row = ({ row, index, moveRow }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item: any, monitor) {
      if (!dropRef.current) {
        return;
      }
      const tempItem = item;
      const dragIndex = item?.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      tempItem.index = hoverIndex;
    },
  });

  const [isDragging, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // const opacity = !isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <TableRow ref={dropRef}>
      <div ref={dragRef}>
        {row.cells.map((cell) => {
          return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
        })}
      </div>
    </TableRow>
  );
};

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        Footer: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
            Footer: 'First Name',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            Footer: 'Last Name',
          },
        ],
      },
      {
        Header: 'Info',
        Footer: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            Footer: 'Age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            Footer: 'Visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
            Footer: 'Status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
            Footer: 'Profile Progress',
          },
        ],
      },
    ],
    [],
  );

  const [data, setData] = React.useState(() => makeData(20));
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...

  return (
    <div>
      <ReactTable
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  );
}

export default App;
