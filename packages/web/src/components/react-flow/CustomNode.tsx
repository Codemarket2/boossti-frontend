import Edit from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import React, { memo, useContext, useState } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import DisplayRichText from '../common/DisplayRichText';
import { DisplayForm } from '../form2/DisplayForm';
import EditNode from './EditNode';
import { FlowContext } from './FlowEditor';

const initialState = { edit: false };

export default memo(({ data, isConnectable, selected, id }: NodeProps) => {
  const flowContext = useContext(FlowContext);
  const [state, setState] = useState(initialState);
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <Card
        variant="outlined"
        style={{
          borderColor: '#000000',
          borderWidth: selected ? 1.5 : 1,
          backgroundColor: data?.backgroundColor,
          color: data?.color,
        }}
      >
        {selected && (
          <IconButton
            size="small"
            onClick={() => setState({ ...state, edit: true })}
            style={{ position: 'absolute', right: -25 }}
          >
            <Edit fontSize="small" />
          </IconButton>
        )}
        <div className="p-2" style={{ maxWidth: '300px' }}>
          <Typography textAlign="center">
            <DisplayRichText value={data?.label} />
          </Typography>
          {data?.formId && data?.formView === 'fullForm' && (
            <div>
              <Divider />
              <DisplayForm _id={data?.formId} settings={{ widgetType: 'form' }} />
            </div>
          )}
        </div>
        {state.edit && (
          <EditNode
            open={state.edit}
            onClose={() => setState(initialState)}
            data={data}
            onChange={(newData) => {
              if (flowContext?.onNodeChange) flowContext?.onNodeChange(id, newData);
              setState(initialState);
            }}
          />
        )}
      </Card>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </>
  );
});
