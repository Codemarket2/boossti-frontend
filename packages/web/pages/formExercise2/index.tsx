// import UserLayout from '../../src/components/common/UserLayout';
// import ParentComponent from '../../src/components/ReactGridLayoutEditor/ParentCompoonent';
// import FeedLayout from '../../src/components/form2/feed/FeedLayout';
// // packages\web\src\components\formExercise2\formExercise.tsx
// // packages\web\src\components\FormExercise2\FormExercise.tsx
// export default function Thinking1234() {
//   return (
//     <UserLayout authRequired>
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'stretch',
//           height: '100vh', // Set height to 100% of the viewport height
//           width: '100%',
//           borderColor: 'green',
//         }}
//       >
//         <p>Just Checking Again</p>
//         {/* <DragFromOutsideLayout layout_passed = {[]}/> */}
//         <ParentComponent/>
//       </div>
//     </UserLayout>
//   );
// }

import React, { useState } from 'react';
import UserLayout from '../../src/components/common/UserLayout';
import DragFromOutsideLayout from '../../src/components/ReactGridLayoutEditor/ReactGridLayoutEditor';
import FeedLayout from '../../src/components/form2/feed/FeedLayout';
// packages\web\src\components\formExercise2\formExercise.tsx
// packages\web\src\components\FormExercise2\FormExercise.tsx

const ParentComponent = () => {
  const [layouts2, setLayouts2] = useState([]);

  const handleLayoutChange = (newLayouts) => {
    // console.log(layouts2,"New Check")
    setLayouts2(newLayouts);
  };

  return (
    <div>
      <UserLayout authRequired>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: '100vh', // Set height to 100% of the viewport height
            width: '100%',
            borderColor: 'green',
          }}
        >
          <p>Just Checking Again</p>
          {/* <DragFromOutsideLayout layout_passed = {[]}/> */}
          {/* <DragFromOutsideLayout
            value={layouts2}
            onLayoutChange={handleLayoutChange}
            onChange={handleLayoutChange}
          /> */}
        </div>
      </UserLayout>
    </div>
  );
};

export default ParentComponent;
