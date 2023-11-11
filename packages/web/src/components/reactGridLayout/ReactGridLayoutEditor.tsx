import React from 'react';
import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import Grid from '@mui/material/Grid';
import FormList from '../form2/FormList';
import { DisplayForm } from '../form2/DisplayForm';
import FormListReactGridLayout from './FormListReactGridLayout';
import SidePanelToolBox from '../craftJS/SidePanelToolBox';

const ReactGridLayoutEditor = () => {
  return (
    <>
      {/*   <Grid container spacing={2}>
    <Grid item xs={4}>
      <div style={{ backgroundColor: 'violet' }}>
        <FormListReactGridLayout hideHeader />
      </div>
      </Grid>
      <Grid item xs={8}>
      <div style={{ backgroundColor: 'yellow' }}>
        <FormListReactGridLayout hideHeader />
      </div>
      </Grid>
      </Grid> */}

      {/* <div style={{ backgroundColor: 'violet' }}>
        <FormListReactGridLayout hideHeader />
      </div> */}

      <div style={{ backgroundColor: 'yellow' }}>
        <FormListReactGridLayout hideHeader />
      </div>

      {/* <div
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                backgroundColor: 'gray',
              }}
            >
    <SidePanelToolBox /> */}
      {/* </div> */}
      {/* <ResponsiveGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="c" style={{ backgroundColor: 'violet' }}>
        <SidePanelToolBox />
        </div>
        <div key="b" style={{ backgroundColor: 'violet' }}>
          <FormListReactGridLayout hideHeader />
        </div>

        <div key="a" style={{ backgroundColor: 'violet' }}>
          <DisplayForm
            slug="address"
            settings={{ widgetType: 'form', whoCanSubmit: 'all' }}
            modifyForm={(form) => {
              const newForm = { ...form };
              newForm.fields = newForm?.fields?.map((field) => {
                const newField = { ...field };
                if (newField?.label?.toLowerCase() === 'roles') {
                  newField.options.hidden = true;
                }
                return newField;
              });
              return newForm;
            }}
          />
        </div>
      </ResponsiveGridLayout> */}
    </>
  );
};

export default ReactGridLayoutEditor;
