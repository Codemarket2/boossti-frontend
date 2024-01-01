import UserLayout from '../../src/components/common/UserLayout';
import GridExercise2 from '../../src/components/ReactGridLayoutEditor/ReactGridLayoutEditor';
import FeedLayout from '../../src/components/form2/feed/FeedLayout';
// packages\web\src\components\formExercise2\formExercise.tsx
// packages\web\src\components\FormExercise2\FormExercise.tsx
export default function Thinking1234() {
  return (
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
        {/* <p>Just Checking Again</p> */}
        <GridExercise2 />
        {/* <FeedLayout/> */}
      </div>
    </UserLayout>
  );
}
