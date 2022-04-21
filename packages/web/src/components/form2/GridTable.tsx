import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';

interface IProps {
  fields: any;
  rowValues: any;
}
export default function GridTable({ fields, rowValues }: IProps) {
  const columns: GridColDef[] = fields?.map((field: any, k: number) => {
    return {
      field: field.label,
      headerName: field.label,
      width: 150,
      editable: true,
    };
  });

  const rows = [];
  const filteredRows = rowValues?.map((response, key) => {
    const myobj = { id: key };

    return fields?.map((field, i) => {
      return response?.values
        ?.filter((v) => v.field === field._id)
        ?.map((value) => {
          // alert(value.value);
          if (field.fieldType === 'number') {
            myobj[field.label] = value.valueNumber;
            return myobj;
          }
          myobj[field.label] = value.value;
          return myobj;
        });
    }, rows.push(myobj));
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
