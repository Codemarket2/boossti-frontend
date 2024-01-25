import UserLayout from '../../src/components/common/UserLayout';
import TicTacToe from '../../src/components/TicTacToe/TicTacToe';
import FeedLayout from '../../src/components/form2/feed/FeedLayout';

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
        <p>Just Checking</p>
        <TicTacToe />
        {/* <FeedLayout/> */}
      </div>
    </UserLayout>
  );
}
