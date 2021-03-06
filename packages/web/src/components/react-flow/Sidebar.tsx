import { useGetForms } from '@frontend/shared/hooks/form';
import Search from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import React from 'react';
import ErrorLoading from '../common/ErrorLoading';

export default function Sidebar() {
  const { data, error, loading, state, setState } = useGetForms({ page: 1, limit: 10 });

  const onDragStart = (event, nodeType, nodeData) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({
        nodeType,
        data: nodeData,
      }),
    );
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="mt-1">
      <div>
        {/* <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, 'customNode', { label: 'Sample text...' })}
          draggable
        >
          Text Node
        </div> */}
        {/* <Typography>Forms</Typography> */}
        <TextField
          fullWidth
          size="small"
          label="Search form"
          value={state.search}
          onChange={({ target: { value } }) => setState({ ...state, search: value })}
          className="my-2"
          InputProps={{
            endAdornment: <Search />,
          }}
        />
        {loading || error ? (
          <ErrorLoading error={error} />
        ) : (
          <div style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
            {data?.getForms?.data?.map((form) => (
              <div
                key={form?._id}
                className="dndnode"
                onDragStart={(event) =>
                  onDragStart(event, 'customNode2', { formId: form?._id, label: form?.name })
                }
                draggable
              >
                {form?.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
