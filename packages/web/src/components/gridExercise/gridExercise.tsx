import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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

    this.state = {
      compactType: 'No Compaction',
      mounted: false,
      layouts1: { lg: generateLayout() },
      layouts2: { lg: [] },
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
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
    console.log('onDrop triggered');
    event.preventDefault();
    this.removeValidDropAreaIndicator();

    const sourceItem = JSON.parse(event.dataTransfer.getData('text/plain'));
    console.log(sourceItem);

    if (sourceItem) {
      this.dropData = { targetLayout, sourceItem };

      setTimeout(() => {
        this.setState({}); // Trigger a re-render
      }, 0);
    }
  };

  componentDidUpdate() {
    const { dropData } = this;
    if (dropData) {
      const { targetLayout, sourceItem } = dropData;
      this.setState((prevState) => {
        const updatedSourceLayout = prevState[sourceItem.layoutKey].lg;
        const newItem = {
          i: sourceItem.i,
          x: 0,
          y: 0,
          w: sourceItem.w,
          h: sourceItem.h,
          static: false,
          text: sourceItem.text,
        };

        let updatedTargetLayout = prevState[targetLayout].lg;

        if (sourceItem.layoutKey !== targetLayout) {
          updatedTargetLayout = updatedTargetLayout.concat(newItem);
        }

        if (
          !_.isEqual(updatedSourceLayout, prevState[sourceItem.layoutKey].lg) ||
          !_.isEqual(updatedTargetLayout, prevState[targetLayout].lg)
        ) {
          this.dropData = null;
          return {
            ...prevState,
            [sourceItem.layoutKey]: { lg: updatedSourceLayout },
            [targetLayout]: { lg: updatedTargetLayout },
          };
        }

        return null;
      });
    }
  }

  generateDOM(layout, layoutKey) {
    console.log(layout);
    return _.map(layout.lg, (l, i) => {
      const itemStyles = {
        backgroundColor: l.i === '0' ? 'red' : 'blue',
        padding: '20px',
        borderRadius: '5px',
        cursor: 'move',
        height: '50px',
        width: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      };
      return (
        <div
          key={i}
          className={`grid-item ${l.static ? 'static' : ''}`}
          style={itemStyles}
          draggable={!l.static}
          onDragStart={(e) => this.onDragStart(e, l, layoutKey)}
        >
          {l.static ? (
            <span
              className="text static-text"
              title="This item is static and cannot be removed or resized."
            >
              {l.text}
            </span>
          ) : (
            <span className="text">{l.text}</span>
          )}
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
            {this.generateDOM(layouts1, 'layouts1')}
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
              compactType={compactType}
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
