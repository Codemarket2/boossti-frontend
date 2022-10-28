import { useGetForms } from '@frontend/shared/hooks/form';
import { IForm } from '@frontend/shared/types';
import AddCircle from '@mui/icons-material/AddCircle';
import Search from '@mui/icons-material/Search';
import { IconButton, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Fragment } from 'react';
import { useReactFlow } from 'reactflow';
import ErrorLoading from '../common/ErrorLoading';

interface ISidebar {
  nodes: any[];
}

export default function Sidebar({ nodes }: ISidebar) {
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
        <Tooltip title="Create new form" placement="left">
          <a href="/form/new" target="_blank">
            <IconButton color="primary">
              <AddCircle fontSize="large" />
            </IconButton>
          </a>
        </Tooltip>
        {loading || error ? (
          <ErrorLoading error={error} />
        ) : (
          <div style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
            {data?.getForms?.data?.map((form) => (
              <ListItem
                form={form}
                existingNode={nodes?.find((node) => node?.data?.formId === form?._id)}
                onDragStart={onDragStart}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

interface IListItem {
  form: IForm;
  existingNode: any;
  onDragStart: any;
}

const ListItem = ({ form, existingNode, onDragStart }: IListItem) => {
  const { setCenter } = useReactFlow();
  return (
    <Fragment key={form?._id}>
      <Tooltip
        placement="left"
        title={existingNode?.id ? 'This form is already present, click to goto the node' : 'Drag'}
      >
        <div
          className="dndnode"
          onClick={() => {
            if (existingNode?.id) {
              setCenter(existingNode?.position?.x, existingNode?.position?.y, {
                duration: 800,
              });
            }
          }}
          onDragStart={(event) => {
            onDragStart(event, 'customNode2', form);
          }}
          draggable={!existingNode?.id}
        >
          {form?.name}
        </div>
      </Tooltip>
    </Fragment>
  );
};
