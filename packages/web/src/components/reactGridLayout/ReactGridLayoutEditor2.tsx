import React from 'react';
import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import FormList from '../form2/FormList';
import { DisplayForm } from '../form2/DisplayForm';
import FormListReactGridLayout from './FormListReactGridLayout';

const ReactGridLayoutEditor2 = () => {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 5, static: true },
    { i: 'b', x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 6, y: 0, w: 3, h: 2 },
  ];
  return (
    <>
      {/* <ResponsiveGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="c" style={{ backgroundColor: 'violet' }}>
          <FormList hideHeader />
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

export default ReactGridLayoutEditor2;
