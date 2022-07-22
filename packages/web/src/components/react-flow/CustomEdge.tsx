import Edit from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useContext, useState } from 'react';
import { getBezierPath, getEdgeCenter, EdgeProps } from 'react-flow-renderer';
import EditEdge from './EditEdge';
import { FlowContext } from './FlowEditor';

const foreignObjectSize = 50;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  selected,
  animated,
}: EdgeProps) {
  const { onEdgeChange, editMode } = useContext(FlowContext);
  const [edit, setEdit] = useState(false);
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        markerEnd={markerEnd}
      />
      {editMode && selected && (
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={edgeCenterX - foreignObjectSize / 2}
          y={edgeCenterY - foreignObjectSize / 2}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <IconButton size="small" onClick={() => setEdit(true)}>
            <Edit fontSize="small" />
          </IconButton>
          {edit && (
            <EditEdge
              edge={{
                id,
                sourceX,
                sourceY,
                targetX,
                targetY,
                sourcePosition,
                targetPosition,
                style,
                data,
                markerEnd,
                selected,
                animated,
              }}
              open={edit}
              onClose={() => setEdit(false)}
              onEdgeChange={(newEdge) => {
                onEdgeChange(id, newEdge);
                setEdit(false);
              }}
            />
          )}
        </foreignObject>
      )}
      {data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            style={{ fontSize: '12px' }}
            startOffset="50%"
            textAnchor="middle"
          >
            {data?.label}
          </textPath>
        </text>
      )}
    </>
  );
}
