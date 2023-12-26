import React, { useState, Fragment } from 'react';

import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
// packages\web\src\components\form2\FormList.tsx
// import { use\GetForms } from '@frontend/shared/hooks/form';
/* eslint-disable react/jsx-wrap-multilines */
import Link from 'next/link';
import { useRouter } from 'next/router';

// import { useGetForms } from '@frontend/shared/hooks/form';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import { getUserAttributes } from '@frontend/shared/hooks/user/getUserForm';
import { useSelector } from 'react-redux';
import Column from '../../src/components/response/Column';
// import FeedLayout from "./form2/feed/FeedLayout"

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface YourComponentState {
  compactType: string;
  mounted: boolean;
  layouts1: { lg: any[] };
  layouts2: { lg: any[] };
}

export default class FormGrid extends React.Component<Record<string, unknown>, YourComponentState> {
  dropData: { targetLayout: string; sourceItem: any } | null = null;

  constructor(props: Record<string, unknown>) {
    super(props);
    // const { data, error, loading, state, setState } = useGetForms({ true });
    this.state = {
      compactType: 'No Compaction',
      mounted: false,
      layouts1: { lg: generateLayout() },
      layouts2: { lg: [] },
    };
  }

  // componentDidMount() {
  //   this.setState({ mounted: true });
  // }
  // let userForm = useSelector(({ setting }: any) => setting.userForm);

  componentDidMount() {
    this.setState({ mounted: true });
    this.processDropData();
  }

  componentDidUpdate() {
    this.processDropData();
  }

  onDragStart = (event, item, layoutKey1) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ ...item, layoutKey: layoutKey1 }));
  };

  onDragLeave = () => {
    this.removeValidDropAreaIndicator();
  };

  removeValidDropAreaIndicator = () => {
    const validDropAreas = document.querySelectorAll('.grid-item.valid-drop-area');
    validDropAreas.forEach((area) => {
      area.classList.remove('valid-drop-area');
    });
  };

  onDrop = (targetLayout: string, event: React.DragEvent) => {
    event.preventDefault();
    this.removeValidDropAreaIndicator();
    const sourceItem = JSON.parse(event.dataTransfer.getData('text/plain'));

    if (sourceItem) {
      this.dropData = { targetLayout, sourceItem };

      setTimeout(() => {
        this.setState({}); // Trigger a re-render
      }, 0);
    }
  };

  generateDOM = (layout) => {
    return _.map(layout.lg, (form, i) => {
      const itemStyles = {
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
        cursor: 'move',
        height: '50px',
        width: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
      };
      return (
        <div
          key={i}
          className={`grid-item ${form.static ? 'static' : ''}`}
          style={itemStyles}
          draggable={!form.static}
        >
          <Fragment key={form._id}>
            <div>
              <p>{form.name}</p>
              <div dangerouslySetInnerHTML={{ __html: form.values[1].value }} />
            </div>
          </Fragment>
        </div>
      );
    });
  };

  processDropData() {
    const { dropData } = this;
    if (dropData) {
      const { targetLayout, sourceItem } = dropData;
      this.setState((prevState) => {
        const newItem = { ...sourceItem, x: 0, y: 0 }; // Include full form data

        const updatedTargetLayout = prevState[targetLayout].lg.concat(newItem);
        if (!_.isEqual(updatedTargetLayout, prevState[targetLayout].lg)) {
          this.dropData = null;
          return {
            ...prevState,
            [targetLayout]: { lg: updatedTargetLayout },
          };
        }

        return null;
      });
    }
  }

  render() {
    const { compactType, mounted, layouts2 } = this.state;
    return (
      <div
        style={{
          border: '5px solid #ddd',
          height: '100%',
          width: '100%',
          marginBottom: '20px',
          borderRadius: '5px',
        }}
      >
        {/* <FormList/> */}
        <div
          style={{
            border: '5px solid #ddd',
            borderRadius: '5px',
            marginBottom: '20px',
            display: 'flex',
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              border: '5px solid #ddd',
              borderRadius: '5px',
              marginBottom: '20px',
            }}
          >
            {/* {this.generateDOM(layouts1, 'layouts1')}
            //  */}
            <Column
              form={{
                _typename: 'Form',
                _id: '6324e600fe046781e9d33d6f',
                name: 'Pages',
                slug: 'pages',
                fields: {
                  __typename: 'Field2',
                  _id: '6324e5ffa24b17c1222249c0',
                  label: 'Title',
                  fieldType: 'text',
                },
              }}
            />
          </div>
          <div
            style={{
              border: '5px solid #ddd',
              borderRadius: '5px',
              marginBottom: '20px',
              borderColor: 'black',
              height: '100%',
              width: '100%',
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => this.onDrop('layouts2', e)}
          >
            <ResponsiveReactGridLayout
              // className="layout"
              // rowHeight={30}
              // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              // layouts={layouts2}
              // measureBeforeMount={false}
              // useCSSTransforms={mounted}
              compactType="No Compaction"
            >
              {this.generateDOM(layouts2)}
            </ResponsiveReactGridLayout>
          </div>
        </div>
      </div>
    );
  }
}

function generateLayout() {
  const layout = _.map(_.range(0, 2), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    const layoutItem = {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: false,
      text: `Text - ${i}`,
    };

    return layoutItem;
  });

  return layout;
}
