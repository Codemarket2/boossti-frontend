import { Typography } from '@mui/material';
import { Handle, Position } from 'react-flow-renderer';
// import { useCallback } from 'react';

// const handleStyle = { left: 10 };

export default function CustomNode() {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  return (
    <div className="bg-danger p-2">
      <Typography>data.label</Typography>
      {/* <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
    </div> */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
