/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import StyleDrawer from './StyleDrawer';

export default function StylePage() {
  const [styles, setStyles] = useState<any>({});
  const [drawer, setDrawer] = useState(false);
  const removeStyle = (styleKey: string) => {
    const { [styleKey]: removedStyle, ...restStyles } = styles;
    setStyles(restStyles);
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
        onStylesChange={(value) => setStyles(value)}
      />
    </div>
  );
}
