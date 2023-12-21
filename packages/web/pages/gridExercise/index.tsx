import UserLayout from '../../src/components/common/UserLayout';
import GridExercise from '../../src/components/gridExercise/gridExercise';

export default function Thinking1234() {
  return (
    <UserLayout authRequired>
      <GridExercise />
    </UserLayout>
  );
}
