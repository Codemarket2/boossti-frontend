import Edit from '@mui/icons-material/Edit';
import Settings from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import React, { memo, useContext, useState } from 'react';
import { Handle, NodeProps } from 'reactflow';
import { Tooltip } from '@mui/material';
import DisplayRichText from '../common/DisplayRichText';
import { DisplayForm } from '../form2/DisplayForm';
import EditNode from './EditNode';
import { FlowContext } from './FlowEditor';
import DisplayFormField from './DisplayFormField';
import DisplayResponseById from '../response/DisplayResponseById';
import DisplayDefaultResponse from './DisplayDefaultResponse';
import Overlay from '../common/Overlay';

const initialState = { editNodeSetting: false, editResponse: false };

export default memo(({ data, isConnectable, selected, id }: NodeProps) => {
  const { onNodeChange, editMode } = useContext(FlowContext);
  const [state, setState] = useState(initialState);

  return (
    <div className="nowheel">
      <Card
        variant="outlined"
        style={{
          borderColor: '#000000',
          borderWidth: selected ? 1.5 : 1,
          backgroundColor: data?.backgroundColor,
          color: data?.color,
          minWidth: 120,
        }}
      >
        {editMode && selected && (
          <Tooltip title="Node Settings">
            <IconButton
              size="small"
              onClick={() => setState({ ...initialState, editNodeSetting: true })}
              style={{ position: 'absolute', right: -25 }}
            >
              <Settings fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {editMode && selected && data?.formView === 'formResponse' && !data?.responseId && (
          <Tooltip title="Edit Response">
            <IconButton
              size="small"
              onClick={() => setState({ ...initialState, editResponse: true })}
              style={{ position: 'absolute', right: -25, top: -20 }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <div className="p-2" style={{ maxWidth: '300px', overflowX: 'auto' }}>
          {(!data?.formView || data?.formView === 'formName') && (
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
              ) : data?.formView === 'formField' ? (
                <>
                  {data?.fieldId ? (
                    <DisplayFormField formId={data?.formId} fieldId={data?.fieldId} />
                  ) : (
                    <Typography color="error">Please select form field</Typography>
                  )}
                </>
              ) : (
                data?.formView === 'formResponse' && (
                  <>
                    {data?.responseId ? (
                      <DisplayResponseById
                        responseId={data?.responseId}
                        hideBreadcrumbs
                        hideAuthor
                        hideDelete
                      />
                    ) : (
                      <DisplayDefaultResponse formId={data?.formId} />
                    )}
                  </>
                )
              )}
            </>
          )}
        </div>
        {state.editNodeSetting && (
          <EditNode
            open={state.editNodeSetting}
            onClose={() => setState(initialState)}
            data={data}
            onChange={(newData) => {
              if (onNodeChange) onNodeChange(id, newData);
              setState(initialState);
            }}
          />
        )}
        {state.editResponse && (
          <Overlay open={state.editResponse} onClose={() => setState(initialState)}>
            <div className="p-2">
              <DisplayForm
                _id={data?.formId}
                settings={{ formView: 'fullForm', widgetType: 'form' }}
                createCallback={(response) => {
                  if (response?._id) {
                    const newData = { ...data, responseId: response?._id };
                    onNodeChange(id, newData);
                  }
                  setState(initialState);
                }}
              />
            </div>
          </Overlay>
        )}
      </Card>
      {data?.ports?.map((port) => {
        let handleStyles = {};
        if (port?.alignment || port?.alignment === 0) {
          if (['top', 'bottom'].includes(port.position)) {
            handleStyles = { left: `${port?.alignment}%` };
          } else if (['left', 'right'].includes(port.position)) {
            handleStyles = { top: `${port?.alignment}%` };
          }
        }
        return (
          <Handle
            style={{ ...handleStyles, backgroundColor: port?.color }}
            key={port?._id}
            type={port?.type}
            id={port?._id}
            position={port.position}
          />
        );
      })}
    </div>
  );
});
