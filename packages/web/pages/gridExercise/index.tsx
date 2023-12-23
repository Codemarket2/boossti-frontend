import UserLayout from '../../src/components/common/UserLayout';
import GridExercise from '../../src/components/gridExercise/gridExercise';

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
        <GridExercise
          style={
            {
              // border: 'none',
              // flex: '1', // Take up remaining vertical space
            }
          }
        />
      </div>
    </UserLayout>
  );
}
