import GridLayout, { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

export default function page() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 6, h: 1 },
    { i: 'b', x: 0, y: 0, w: 6, h: 1 },
  ];
  //   return (
  //     <ResponsiveGridLayout
  //       className="layout"
  //       layouts={layout}
  //       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
  //       cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
  //     >
  //       <div key="1" className="bg-danger">
  //         1
  //       </div>
  //       <div key="2" className="bg-danger">
  //         2
  //       </div>
  //       <div key="3" className="bg-danger">
  //         3
  //       </div>
  //     </ResponsiveGridLayout>
  //   );
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      //   rowHeight={30}
      width={1000}
      onLayoutChange={(newLayout) => console.log('newLayout', newLayout)}
    >
      <div key="a" className="bg-danger">
        a
      </div>
      <div key="b" className="bg-warning">
        b
      </div>
    </GridLayout>
  );
}
