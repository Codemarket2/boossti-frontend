import * as React from 'react';
import DataGrid, { SelectColumn } from 'react-data-grid';

export const DataTable = ({ rows, columns, setRows }) => {
  return (
    <div style={{ height: 720, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={[SelectColumn, ...columns]}
        rowHeight={30}
        onRowsChange={setRows}
      />
    </div>
  );
};
