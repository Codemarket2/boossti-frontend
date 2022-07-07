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
import DisplayFormField from './DisplayFormField';

const initialState = { edit: false };

export default memo(({ data, isConnectable, selected, id }: NodeProps) => {
  const { onNodeChange, editMode } = useContext(FlowContext);
  const [state, setState] = useState(initialState);
  return (
    <div className="nowheel">
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
        {editMode && selected && (
          <IconButton
            size="small"
            onClick={() => setState({ ...state, edit: true })}
            style={{ position: 'absolute', right: -25 }}
          >
            <Edit fontSize="small" />
          </IconButton>
        )}
        <div className="p-2" style={{ maxWidth: '300px', overflowX: 'auto' }}>
          {data?.formView !== 'formField' && (
            <Typography textAlign="center">
              <DisplayRichText value={data?.label} />
            </Typography>
          )}
          {data?.formId && (
            <>
              {data?.formView === 'fullForm' ? (
                <>
                  <Divider className="my-1" />
                  <DisplayForm _id={data?.formId} settings={{ widgetType: 'form' }} />
                </>
              ) : (
                data?.formView === 'formField' && (
                  <>
                    {data?.fieldId ? (
                      <DisplayFormField formId={data?.formId} fieldId={data?.fieldId} />
                    ) : (
                      <Typography color="error">Please select form field</Typography>
                    )}
                  </>
                )
              )}
            </>
          )}
        </div>
        {state.edit && (
          <EditNode
            open={state.edit}
            onClose={() => setState(initialState)}
            data={data}
            onChange={(newData) => {
              if (onNodeChange) onNodeChange(id, newData);
              setState(initialState);
            }}
          />
        )}
      </Card>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
});
