import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useGetForm } from '@frontend/shared/hooks/form';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import Func from '../response/GettingListResopnse';
// import FeedLayout from "./form2/feed/FeedLayout"
import FeedLayout from '../form2/feed/FeedLayout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import FormList from '../form2/FormList';
// packages\web\src\components\form2\FormList.tsx
// import { use\GetForms } from '@frontend/shared/hooks/form';
/* eslint-disable react/jsx-wrap-multilines */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
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
import ErrorLoading from '../common/ErrorLoading';
import ListHeader2 from '../common/ListHeader2';

interface YourComponentState {
  compactType: string;
  mounted: boolean;
  layouts1: { lg: any[] };
  layouts2: { lg: any[] };
}

export default class DragFromOutsideLayout extends React.Component<
  Record<string, unknown>,
  YourComponentState
> {
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
    console.log('onDrop triggered');
    event.preventDefault();
    this.removeValidDropAreaIndicator();
    const sourceItem = JSON.parse(event.dataTransfer.getData('text/plain'));
    console.log(sourceItem.slug, 'From here');
    console.log(sourceItem.createdBy.values[0].value);
    // console.log(sourceItem.createdAt)
    if (sourceItem) {
      this.dropData = { targetLayout, sourceItem };

      setTimeout(() => {
        this.setState({}); // Trigger a re-render
      }, 0);
    }
  };
  componentDidMount() {
    // const fetchData = async () => {
    //   const { data } = await useGetResponses({
    //     formId: "6324e600fe046781e9d33d6f",
    //   });
    //   console.log(data, "dfdfdgdg");
    // };

    // fetchData();

    this.setState({ mounted: true });
  }

  componentDidUpdate() {
    const { dropData } = this;
    if (dropData) {
      const { targetLayout, sourceItem } = dropData;
      this.setState((prevState) => {
        // const updatedSourceLayout = prevState[sourceItem.layoutKey].lg;
        const newItem = { ...sourceItem, x: 0, y: 0 }; // Include full form data

        const updatedTargetLayout = prevState[targetLayout].lg.concat(newItem);
        if (
          // !_.isEqual(updatedSourceLayout, prevState[sourceItem.layoutKey].lg) ||
          !_.isEqual(updatedTargetLayout, prevState[targetLayout].lg)
        ) {
          this.dropData = null;
          return {
            ...prevState,
            // [sourceItem.layoutKey]: { lg: updatedSourceLayout },
            [targetLayout]: { lg: updatedTargetLayout },
          };
        }

        return null;
      });
    }
  }

  generateDOM(layout, layoutKey) {
    // let ans = Func({form : '6324e600fe046781e9d33d6f'});
    // console.log(ans)
    return _.map(layout.lg, (form, i) => {
      const itemStyles = {
        // backgroundColor: 'blue',
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
          // onDragStart={(e) => this.onDragStart(e, form, layoutKey)}
        >
          <Fragment key={form._id}>
            {/* {i > 0 && <Divider />} */}
            {/* <Link href={`/form/${form.slug}`}> */}
            <div>
              <p>{form.name}</p>
              <p>
                {form.createdBy.values[0].value} {form.createdBy.values[1].value}{' '}
                {getCreatedAtDate(form.createdAt)}
              </p>
              {/* <p>
                {`
                ${getCreatedAtDate(form.createdAt)}`}
              </p> */}
            </div>
            {/* </Link> */}
          </Fragment>
        </div>
      );
    });
  }

  render() {
    const { compactType, mounted, layouts1, layouts2 } = this.state;
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
            <FormList />
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
              compactType={'No Compaction'}
            >
              {this.generateDOM(layouts2, 'layouts2')}
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
    console.log('Generated Layout Item:', layoutItem);
    return layoutItem;
  });

  console.log('Generated Layout:', layout);
  return layout;
}
