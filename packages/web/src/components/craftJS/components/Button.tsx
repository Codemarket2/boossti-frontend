// MUI
import Button from '@mui/material/Button';

// OTHERS
import { useNode } from '@craftjs/core';

interface ButtonProps {
  text: string;
}

const Btn = ({ text }: ButtonProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Button variant="contained">{text}</Button>
    </div>
  );
};

Btn.craft = {
  rules: {
    canDrag: (node) => node.data.props.text !== 'Drag',
  },
};
export default Btn;
