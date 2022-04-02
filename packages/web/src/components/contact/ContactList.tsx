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
import { Button, TextField } from '@mui/material';
import { useCreateMailingListFromContact } from '@frontend/shared/hooks/email/createMailingList';

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
    { field: 'Phone', width: 150 },
    { field: 'Group', width: 200 },
    { field: 'Business', width: 200 },
    { field: 'City', width: 250 },
  ];
  const [rowData, setRowData] = React.useState([]);

  useEffect(() => {
    const allData = [];
    data?.getAllContacts?.data?.forEach((d) => {
      const temp: any = {};
      temp.id = d._id;
      temp.Email = d.email;
      temp.Phone = d.phone;
      temp.Group = d.groupName;
      temp.Business = d.businessName;
      temp.City = d.city;
      allData.push(temp);
    });
    setRowData([...allData]);
  }, [data]);
  const rows: GridRowsProp = [...rowData];

  const { handleCreateMailingList, createLoading } = useCreateMailingListFromContact();
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [mailingList, setMailingList] = React.useState('');

  const createMailingListWithId = async (e) => {
    e.preventDefault();
    const payload = {
      listName: mailingList,
      selectedContact: selectionModel,
    };
    await handleCreateMailingList(payload);
  };

  return (
    <>
      <div style={{ height: 640, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
        />
      </div>
      {selectionModel.length ? (
        <form>
          <TextField
            required
            fullWidth
            label="Mailing List Name"
            name="listName"
            value={mailingList}
            onChange={({ target }) => setMailingList(target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={createMailingListWithId}
          >
            Create Mailing List
          </Button>
        </form>
      ) : null}
    </>
  );
}
