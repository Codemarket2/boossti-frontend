// MUI
import MaterialButton from '@mui/material/Button';

// OTHERS
import { useNode } from '@craftjs/core';

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <MaterialButton variant="contained">{text}</MaterialButton>
    </div>
  );
};

const ButtonSettings = () => {
  return <>Button Settings</>;
};

Button.craft = {
  rules: {
    canDrag: (node) => node.data.props.text !== 'Drag',
  },

  related: {
    settings: ButtonSettings,
  },
};
export default Button;
