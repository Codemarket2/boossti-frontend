import { useState } from 'react';
import StyleDrawer from './StyleDrawer';

export default function StylePage() {
  const [styles, setStyles] = useState({});
  const [drawer, setDrawer] = useState(false);
  const removeStyle = (styleKey) => {
    const { [styleKey]: removedStyle, ...restStyles } = styles;
    setStyles(restStyles);
    // let tempStyle = { ...styles };
  };
  return (
    <div className="container p-5">
      <h1 onClick={() => setDrawer(true)} style={{ cursor: 'pointer', ...styles }}>
        What is React?
      </h1>
      <p>{JSON.stringify(styles)}</p>
      <StyleDrawer
        onClose={() => setDrawer(false)}
        open={drawer}
        styles={styles}
        onStyleChange={(value) => setStyles({ ...styles, ...value })}
        removeStyle={removeStyle}
      />
    </div>
  );
}
