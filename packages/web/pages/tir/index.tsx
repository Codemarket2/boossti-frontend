import UserLayout from '../../src/components/common/UserLayout';
import ThinkinInReact from '../../src/components/thinkin-in-react/ThinkinInReact';

export default function ThinkInReact() {
  return (
    <UserLayout authRequired>
      <ThinkinInReact />
    </UserLayout>
  );
}
