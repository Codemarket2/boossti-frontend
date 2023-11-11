import React from 'react';
import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import Grid from '@mui/material/Grid';
import FormList from '../form2/FormList';
import { DisplayForm } from '../form2/DisplayForm';
import FormListReactGridLayout from './FormListReactGridLayout';
import SidePanelToolBox from '../craftJS/SidePanelToolBox';

const ReactGridLayoutEditor = () => {
  const width = 800;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ backgroundColor: 'blue' }}>
            {/* <FormListReactGridLayout hideHeader {...width}/> */}
            <FormListReactGridLayout hideHeader />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ReactGridLayoutEditor;
