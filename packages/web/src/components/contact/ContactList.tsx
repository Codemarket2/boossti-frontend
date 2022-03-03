import * as React from 'react';
import {
  GridColumns,
  GridRowsProp,
  DataGrid,
  GridSortDirection,
  GridSortModel,
} from '@mui/x-data-grid';
import { useGetAllContact } from '@frontend/shared/hooks/contact';
import { useEffect } from 'react';

export default function ContactList() {
  return (
    <>
      <Table />
    </>
  );
}

function Table() {
  const { data, error, loading } = useGetAllContact();
  const columns: GridColumns = [
    { field: 'Email', width: 250 },
    { field: 'Phone', width: 250 },
    { field: 'Group', width: 250 },
    { field: 'Business', width: 250 },
    { field: 'City', width: 250 },
  ];
  const [rowData, setRowData] = React.useState([]);

  useEffect(() => {
    const allData = [];
    data?.getAllContacts?.data?.map((d) => {
      const temp = {};
      temp['id'] = d._id;
      temp['Email'] = d.email;
      temp['Phone'] = d.phone;
      temp['Group'] = d.groupName;
      temp['Business'] = d.businessName;
      temp['City'] = d.city;
      allData.push(temp);
    });
    setRowData([...rowData, ...allData]);
  }, [data]);
  const rows: GridRowsProp = [...rowData];
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'Email',
      sort: 'asc' as GridSortDirection,
    },
  ]);

  rows && console.log(rows);

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        sortModel={sortModel}
        loading={loading}
        density="comfortable"
        rows={rows}
        columns={columns}
        onSortModelChange={(model) => setSortModel(model)}
      />
    </div>
  );
}
