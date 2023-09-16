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
  diagramType?: string;
}

export default function Sidebar({ nodes, diagramType }: ISidebar) {
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
          <div style={{ maxHeight: 'calc(90vh - 180px)', overflowY: 'auto' }}>
            {data?.getForms?.data?.map((form) => (
              <ListItem
                form={form}
                existingNode={nodes?.find((node) => node?.data?.formId === form?._id)}
                onDragStart={onDragStart}
                disableDragDuplicateNode={diagramType === 'Work Flow Diagram'}
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
  disableDragDuplicateNode?: boolean;
}

const ListItem = ({ form, existingNode, onDragStart, disableDragDuplicateNode }: IListItem) => {
  const { setCenter } = useReactFlow();
  const disable = disableDragDuplicateNode && existingNode?.id;
  return (
    <Fragment key={form?._id}>
      <Tooltip
        placement="left"
        title={disable ? 'This form is already present, click to goto the node' : 'Drag'}
      >
        <div
          className="dndnode"
          onClick={() => {
            if (disable) {
              setCenter(existingNode?.position?.x, existingNode?.position?.y, {
                duration: 800,
              });
            }
          }}
          onDragStart={(event) => {
            onDragStart(event, 'customNode2', form);
          }}
          draggable={!disable}
        >
          {form?.name}
        </div>
      </Tooltip>
    </Fragment>
  );
};
