import Coworking from '../components/home/Coworking';
import WithLayout from '../components/home/WithLayout';
import Main from '../components/home/Main';

const HomeScreen = (): JSX.Element => {
  return <WithLayout component={Coworking} layout={Main} />;
};

export default HomeScreen;
