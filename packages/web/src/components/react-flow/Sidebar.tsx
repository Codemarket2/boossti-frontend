import { useGetForms } from '@frontend/shared/hooks/form';
import { List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React from 'react';
import ErrorLoading from '../common/ErrorLoading';

export default function Sidebar() {
  const { data, error, loading, state, setState } = useGetForms({ page: 1, limit: 30 });

  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ type: 'default', ...nodeData }),
    );
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, { label: 'Text Node' })}
          draggable
        >
          Text Node
        </div>
        <Typography>Forms</Typography>
        <TextField
          fullWidth
          size="small"
          label="Search form"
          value={state.search}
          onChange={({ target: { value } }) => setState({ ...state, search: value })}
          className="my-2"
        />
        {loading || error ? (
          <ErrorLoading error={error} />
        ) : (
          data?.getForms?.data?.map((form) => (
            <div
              key={form?._id}
              className="dndnode"
              onDragStart={(event) => onDragStart(event, { _id: form?._id, label: form?.name })}
              draggable
            >
              {form?.name}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
