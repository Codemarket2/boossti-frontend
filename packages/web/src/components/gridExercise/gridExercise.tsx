import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const defaultProps = {
  className: 'layout',
  rowHeight: 30,
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
};

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
  constructor(props: Record<string, unknown>) {
    super(props);

    this.state = {
      compactType: 'vertical',
      mounted: false,
      layouts1: { lg: generateLayout() },
      layouts2: { lg: generateLayout() },
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  onDragStart = (event, item, layoutKey1) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ ...item, layoutKey: layoutKey1 }));
    // console.log("Drag Start:", item);
  };

  onDrop = (targetLayout: string, event: React.DragEvent) => {
    event.preventDefault();
    const sourceItem = JSON.parse(event.dataTransfer.getData('text/plain'));

    if (sourceItem) {
      this.setState((prevState) => {
        const updatedSourceLayout = prevState[sourceItem.layoutKey].lg.filter(
          (item) => item.i !== sourceItem.i,
        );

        const newItem = {
          i: sourceItem.i + 1,
          x: 0,
          y: 0,
          w: sourceItem.w,
          h: sourceItem.h,
          static: true,
        };

        const updatedTargetLayout = prevState[targetLayout].lg.concat(newItem);

        // Return the new state object
        return {
          ...prevState,
          [sourceItem.layoutKey]: { lg: updatedSourceLayout },
          [targetLayout]: { lg: updatedTargetLayout },
        };
      });
    }
  };

  generateDOM(layout, layoutKey) {
    return _.map(layout.lg, (l, i) => {
      const itemStyles = {
        backgroundColor: l.static ? 'red' : layoutKey === 'layouts1' ? 'green' : 'blue',
        borderColor: l.static ? 'red' : 'yellow',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'move',
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
              Appended Item - {i}
            </span>
          ) : (
            <span className="text">Dynamic Element {i}</span>
          )}
        </div>
      );
    });
  }

  render() {
    const { compactType, mounted, layouts1, layouts2 } = this.state;
    return (
      <div>
        <div>Compaction type: {_.capitalize(compactType) || 'No Compaction'}</div>
        <button onClick={() => this.setState({ layouts1: { lg: generateLayout() } })} type="button">
          Generate New Layout 1
        </button>
        <button onClick={() => this.setState({ layouts2: { lg: generateLayout() } })} type="button">
          Generate New Layout 2
        </button>
        <div
          style={{
            border: '5px solid #ddd',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => this.onDrop('layouts1', e)}
        >
          <ResponsiveReactGridLayout
            {...defaultProps}
            layouts={layouts1}
            // onBreakpointChange={() => {}}
            measureBeforeMount={false}
            useCSSTransforms={mounted}
            compactType={compactType}
          >
            {this.generateDOM(layouts1, 'layouts1')}
          </ResponsiveReactGridLayout>
        </div>
        <div
          style={{
            border: '5px solid #ddd',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => this.onDrop('layouts2', e)}
        >
          <ResponsiveReactGridLayout
            {...defaultProps}
            layouts={layouts2}
            // onBreakpointChange={() => {}}
            measureBeforeMount={false}
            useCSSTransforms={mounted}
            compactType={compactType}
          >
            {this.generateDOM(layouts2, 'layouts2')}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

function generateLayout() {
  return _.map(_.range(0, 4), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: false,
    };
  });
}
