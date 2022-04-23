import React, { useState } from 'react';
import { Grid, Input, Select } from 'react-spreadsheet-grid';

const GridTable = (props) => {
  const [blurCurrentFocus, setBlurCurrentFocus] = useState(false);
  const [rows, setRows] = useState([
    { id: 'user1', name: 'John Doe', positionId: 1 },
    { id: 'user2', name: 'John Doe', positionId: 1 },
    { id: 'user3', name: 'John Doe', positionId: 1 },
    { id: 'user4', name: 'John Doe', positionId: 1 },
    { id: 'user5', name: 'John Doe', positionId: 1 },
    { id: 'user6', name: 'John Doe', positionId: 1 },
  ]);

  const onFieldChange = (rowId, field, value) => {
    const row = rows.find(({ id }) => id === rowId);

    row[field] = value;

    setRows(() => [].concat(rows));
    setBlurCurrentFocus(() => true);
  };

  const positions = [
    { id: 1, name: 'System Architect' },
    { id: 2, name: 'Frontend Developer' },
    { id: 3, name: 'Backend Developer' },
    { id: 4, name: 'Big Data Developer' },
    { id: 5, name: 'Computer Operator' },
    { id: 6, name: 'Manager' },
    { id: 7, name: 'Content Manager' },
    { id: 8, name: 'Support manager' },
  ];

  return (
    <Grid
      columns={[
        {
          title: () => 'Name',
          value: (row, { focus }) => {
            return <Input value={row.name} focus={focus} />;
          },
        },
        {
          title: () => 'Position',
          value: (row, { focus }) => {
            return (
              <Select
                items={positions}
                selectedId={row.positionId}
                isOpen={focus}
                onChange={() => onFieldChange(this, row.id, 'positionId')}
              />
            );
          },
        },
      ]}
      rows={rows}
      getRowKey={(row) => row.id}
      rowHeight={35}
      isColumnsResizable
      blurCurrentFocus={blurCurrentFocus}
    />
  );
};

export default GridTable;
