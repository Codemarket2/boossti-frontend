import React from 'react';
import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import FormList from '../form2/FormList';
import { DisplayForm } from '../form2/DisplayForm';
import FormListReactGridLayout from './FormListReactGridLayout';
import SidePanelToolBox from '../craftJS/SidePanelToolBox';

const ReactGridLayoutEditor = () => {
  return (
    <>
      <div key="b" style={{ backgroundColor: 'violet' }}>
        <FormListReactGridLayout hideHeader />
      </div>
    </>
  );
};

export default ReactGridLayoutEditor;
