import React from 'react';
import Coworking from '@frontend/template/src/views/Coworking';
import Main from '@frontend/template/src/layouts/Main';
import WithLayout from '@frontend/template/src/WithLayout';

const HomeScreen = (): JSX.Element => {
  return <WithLayout component={Coworking} layout={Main} />;
};

export default HomeScreen;
