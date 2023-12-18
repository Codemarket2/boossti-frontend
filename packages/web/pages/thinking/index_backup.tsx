import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import UserLayout from '../../src/components/common/UserLayout';
import ThinkingR from '../../src/components/thinkinglogs/thinkingR';

const initialState = {
  layouts: {},
  styles: {},
  selectedField: null,
  selectedElement: null,
  layoutEdit: true,
  editMode: false,
};

const layout = [
  { i: 'a', x: 0, y: 500, w: 100, h: 5, static: true },
  { i: 'b', x: 1, y: 500, w: 300, h: 2, minW: 2, maxW: 4 },
  { i: 'c', x: 4, y: 500, w: 100, h: 2 },
];

export default function Thinking1234() {
  return (
    <UserLayout authRequired>
      {/* <ResponsiveGridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
          >
            <div key="b" style={{ backgroundColor: 'violet' }}>
             */}
      <ThinkingR />
      {/* <p>HEHE</p>
            
            </div>
          </ResponsiveGridLayout> */}
    </UserLayout>
  );
}
