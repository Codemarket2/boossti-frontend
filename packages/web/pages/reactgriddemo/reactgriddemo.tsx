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

  onDragOver = (event, targetLayout) => {
    event.preventDefault();

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const targetElement = document.elementFromPoint(mouseX, mouseY);

    const isOverGridItem = targetElement && targetElement.classList.contains('grid-item');

    if (isOverGridItem) {
      targetElement.classList.add('valid-drop-area');
    } else {
      this.removeValidDropAreaIndicator();
    }
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
          updatedTargetLayout = prevState[targetLayout].lg.concat(newItem);
        }

        // Check if the state needs to be updated
        if (
          !_.isEqual(updatedSourceLayout, prevState[sourceItem.layoutKey].lg) ||
          !_.isEqual(updatedTargetLayout, prevState[targetLayout].lg)
        ) {
          return {
            ...prevState,
            [sourceItem.layoutKey]: { lg: updatedSourceLayout },
            [targetLayout]: { lg: updatedTargetLayout },
          };
        }

        // If no update is needed, return null
        return null;
      });
    }
  };

  generateDOM(layout, layoutKey) {
    return _.map(layout.lg, (l, i) => {
      const itemStyles = {
        backgroundColor: l.i === '0' ? 'red' : 'blue',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'move',
        height: '50px',
        width: '100px',
        display: 'flex',
        // flexDirection: 'column',
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
          // display:'flex'
          borderRadius: '5px',
          borderColor: 'green',
        }}
      >
        <div
          style={{
            border: '5px solid #ddd',
            borderRadius: '5px',
            marginBottom: '20px',
            // borderColor: 'black',
            display: 'flex',
            // height: "200px"
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              border: '5px solid #ddd',
              borderRadius: '5px',
              marginBottom: '20px',
              // borderColor: 'black'
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
              // height: "200px"
              width: '100%',
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
      </div>
    );
  }
}

function generateLayout() {
  return _.map(_.range(0, 2), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: false,
      text: `Text - ${i}`,
    };
  });
}
// import React from 'react';
// import _ from 'lodash';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// // import Text2 from './text2';
// // import Text1 from './text1';
// import PropTypes from 'prop-types';

// const ResponsiveReactGridLayout = WidthProvider(Responsive);

// function Text1(props) {
//   const { type, handleSourceItem } = props;

//   return (
//     <div
//       className="droppable-grid-1"
//       draggable
//       unselectable="on"
//       // this is a hack for firefox
//       // Firefox requires some kind of initialization
//       // which we can do by adding this attribute
//       // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
//       // onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
//       // onDragStart={(e) => {
//       //   const sourceItemJson = {
//       //     type: type,
//       //   };
//       //   e.dataTransfer.setData('text/plain', JSON.stringify(sourceItemJson));
//       //   handleSourceItem(sourceItemJson);
//       // }}
//       style={{
//         position: 'absolute',
//         top: '30%',
//         left: '0',
//         transform: 'translateY(-50%)',
//         backgroundColor: 'lightblue',
//         padding: '10px', // Adjust padding as needed
//         borderRight: '1px solid #000',
//         width: '150px',
//         height: '100x',
//       }}
//     >
//       {type}
//     </div>
//   );
// }
// Text1.propTypes = {
//   type: PropTypes.string.isRequired,
//   // handleSourceItem: PropTypes.func.isRequired,
// };

// function Text2(props) {
//   const { type, handleSourceItem } = props;
//   return (
//     <div
//       className="droppable-grid-2"
//       draggable
//       unselectable="on"
//       // this is a hack for firefox
//       // Firefox requires some kind of initialization
//       // which we can do by adding this attribute
//       // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
//       //
//       // onDragStart={(e) => {
//       //   const sourceItemJson = {
//       //     type: type,
//       //   };
//       //   handleSourceItem(sourceItemJson);
//       //   e.dataTransfer.setData('text/plain', JSON.stringify(sourceItemJson));
//       // }}
//       style={{
//         position: 'absolute',
//         top: '60%',
//         left: '0',
//         transform: 'translateY(-50%)',
//         backgroundColor: 'lightblue',
//         padding: '10px', // Adjust padding as needed
//         borderRight: '1px solid #000',
//         width: '150px',
//         height: '100x',
//       }}
//     >
//       {type}
//     </div>
//   );
// }
// Text2.propTypes = {
//   type: PropTypes.string.isRequired,
//   // handleSourceItem: PropTypes.func.isRequired,
// };

// interface YourComponentState {
//   currentBreakpoint: string;
//   compactType: string;
//   mounted: boolean;
//   layouts: { lg: any[] };
// }

// export default class DragFromOutsideLayout extends React.Component<
//   Record<string, unknown>,
//   YourComponentState
// > {
//   state = {
//     currentBreakpoint: 'lg',
//     compactType: 'vertical',
//     mounted: false,
//     layouts: { lg: generateLayout() },
//   };

//   componentDidMount() {
//     const { mounted } = this.state;
//     this.setState({ mounted: true });
//   }

//   onBreakpointChange = (breakpoint) => {
//     const { currentBreakpoint } = this.state;
//     this.setState({
//       currentBreakpoint: breakpoint,
//     });
//   };

//   onCompactTypeChange = () => {
//     const { compactType: oldCompactType } = this.state;
//     const compactType =
//       oldCompactType === 'horizontal'
//         ? 'vertical'
//         : oldCompactType === 'vertical'
//         ? null
//         : 'horizontal';
//     this.setState({ compactType });
//   };

//   // onLayoutChange = (layout, layouts) => {
//   //   this.props.onLayoutChange(layout, layouts);
//   // };

//   onNewLayout = (newLayout) => {
//     this.setState({
//       layouts: { lg: newLayout },
//     });
//   };
//   removeValidDropAreaIndicator = () => {
//     const validDropAreas = document.querySelectorAll('.grid-item.valid-drop-area');
//     validDropAreas.forEach((area) => {
//       area.classList.remove('valid-drop-area');
//     });
//   };

//   onDrop = (targetLayout: string, event: React.DragEvent) => {
//     // event.preventDefault();
//     this.removeValidDropAreaIndicator();

//     const sourceItem = JSON.parse(event.dataTransfer.getData('text/plain'));
//     console.log(sourceItem);
//     if (sourceItem) {
//       this.setState((prevState) => {
//         const updatedSourceLayout = prevState[sourceItem.layoutKey].lg;

//         const newItem = {
//           i: sourceItem.i,
//           x: 0,
//           y: 0,
//           w: sourceItem.w,
//           h: sourceItem.h,
//           static: false,
//           name:
//             sourceItem.type === 'Text1'
//               ? 'Droppable Grid - Text1'
//               : sourceItem.type === 'Text2'
//               ? 'Droppable Grid - Text2'
//               : 'Default Name',
//         };

//         let updatedTargetLayout = prevState[targetLayout].lg;

//         if (sourceItem.layoutKey !== targetLayout) {
//           updatedTargetLayout = prevState[targetLayout].lg.concat(newItem);
//         }

//         // Check if the state needs to be updated
//         if (
//           !_.isEqual(updatedSourceLayout, prevState[sourceItem.layoutKey].lg) ||
//           !_.isEqual(updatedTargetLayout, prevState[targetLayout].lg)
//         ) {
//           return {
//             ...prevState,
//             [sourceItem.layoutKey]: { lg: updatedSourceLayout },
//             [targetLayout]: { lg: updatedTargetLayout },
//           };
//         }

//         // If no update is needed, return null
//         return null;
//       });
//     }
//   };

//   // onDrop = (layout, layoutItem, _event) => {
//   //   const newItem = {
//   //     i: `new-item-${layout.length + 1}`, // Use backticks (`) here
//   //     x: layoutItem.x,
//   //     y: layoutItem.y,
//   //     w: layoutItem.w,
//   //     h: layoutItem.h,
//   //     static: false,
//   //     name: 'Droppable Grid',
//   //   };
//   //   layout = [...layout, newItem];
//   //   this.onNewLayout(layout);
//   // };

//   // onDrop = (layout, layoutItem, event) => {
//   //   const sourceItemJSON = JSON.parse(event.dataTransfer.getData('text/plain'));
//   //   const newItem = {
//   //     i: `new-item-${layout.length + 1}`,
//   //     x: layoutItem.x,
//   //     y: layoutItem.y,
//   //     w: layoutItem.w,
//   //     h: layoutItem.h,
//   //     static: false,
//   //     name:
//   // sourceItemJSON.type === 'Text1'
//   //   ? 'Droppable Grid - Text1'
//   //   : sourceItemJSON.type === 'Text2'
//   //   ? 'Droppable Grid - Text2'
//   //   : 'Default Name',
//   //   };

//   //   // Replace the existing layout with the new item
//   //   // layout = [newItem];
//   //   const newLayout = [...layout, newItem];
//   //   this.onNewLayout(layout);
//   // };

//   // handleSourceItem = (sourceItemJson) => {
//   //   // Do something with sourceItemJson
//   //   console.log('Received sourceItemJson:', sourceItemJson);
//   // };

//   generateDOM() {
//     return _.map(this.state.layouts.lg, function (l, i) {
//       return (
//         <div
//           key={i}
//           className={l.static ? 'static' : 'droppable-element'}
//           style={{
//             backgroundColor: 'orange',
//             position: 'absolute',
//             top: '25%',
//           }}
//           onDragOver={(e) => e.preventDefault()}
//         >
//           {l.name === 'Droppable Grid - Text1' ? (
//             <span className="text" title="This item is static and cannot be removed or resized.">
//               <Text1 type="Text1" />
//             </span>
//           ) : (
//             <span className="text">
//               <Text2 type="Text2" />
//             </span>
//           )}
//         </div>
//       );
//     });
//   }

//   render() {
//     const { layouts, mounted, compactType } = this.state;
//     return (
//       <div>
//         {/* <div>
//           Current Breakpoint: {this.state.currentBreakpoint} (
//           {this.props.cols[this.state.currentBreakpoint]} columns)
//         </div> */}

//         <Text1 type="Text1" />
//         <Text2 type="Text2" />
//         {/* <div
//           className="separator"
//           style={{
//             borderLeft: '1px solid #000', // Color of the separator line
//             height: '100%',
//             margin: '0 10px', // Adjust margin as needed
//           }}
//         ></div> */}
//         <div
//           style={{
//             position: 'absolute',
//             top: '8.5%',
//             bottom: 0,
//             left: '10%', // Adjust to move the line horizontally
//             width: '2px', // Adjust to change the width of the line
//             backgroundColor: '#000', // Adjust to change the color of the line
//           }}
//         />
//         <div>
//           <ResponsiveReactGridLayout
//             {...this.props}
//             layouts={this.state.layouts}
//             onBreakpointChange={this.onBreakpointChange}
//             // onLayoutChange={this.onLayoutChange}
//             onDrop={this.onDrop}
//             // WidthProvider option
//             measureBeforeMount={false}
//             // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
//             // and set `measureBeforeMount={true}`.
//             useCSSTransforms={this.state.mounted}
//             compactType={this.state.compactType}
//             preventCollision={!this.state.compactType}
//             isDroppable
//           >
//             {this.generateDOM()}
//           </ResponsiveReactGridLayout>
//         </div>
//       </div>
//     );
//   }
// }

// // function generateLayout() {
// //   return _.map(_.range(0, 0), function (item, i) {
// //     const y = Math.ceil(Math.random() * 4) + 1;

// //     return newItem= {
// //       x: Math.round(Math.random() * 5) * 2,
// //       y: Math.floor(i / 6) * y,
// //       w: 2,
// //       h: y,
// //       i: i.toString(),
// //       static: false,
// //       name: `Grid Element - ${i}`,
// //     };
// //   });
// // }
// function generateLayout() {
//   return _.map(_.range(0, 0), function (item, i) {
//     const y = Math.ceil(Math.random() * 4) + 1;

//     return {
//       x: Math.round(Math.random() * 5) * 2,
//       y: Math.floor(i / 6) * y,
//       w: 2,
//       h: y,
//       i: i.toString(),
//       static: false,
//       name: `Grid Element - ${i}`,
//     };
//   });
// }
// // if (process.env.STATIC_EXAMPLES === true) {
// //   import("../test-hook.jsx").then(fn => fn.default(DragFromOutsideLayout));
// // }
