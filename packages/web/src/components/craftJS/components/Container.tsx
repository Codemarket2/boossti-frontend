// MUI
// import Button from '@mui/material/Button';

// OTHER
import { useNode, Element } from '@craftjs/core';

const Container = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '1rem',
        border: '2px solid black',
      }}
      ref={(ref) => connect(drag(ref))}
    >
      {children}
    </div>
  );
};

// Container.craft = {
//   rules: {
//     canDrag: (node) => node.data.props.text !== 'Drag',
//   },
// };

export default Container;
