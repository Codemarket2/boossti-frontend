import React from 'react';
import UserLayout from '../../src/components/common/UserLayout';
import ScalingUp from '../../src/components/scalingUp/scalingUp';
import FeedLayout from '../../src/components/form2/feed/FeedLayout';

export default function Thinking1234() {
  return (
    <UserLayout authRequired>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100vh',
          width: '100%',
          borderColor: 'green',
        }}
      >
        {/* <p>Just Checking</p> */}
        <ScalingUp />
        {/* <FeedLayout/> */}
      </div>
    </UserLayout>
  );
}
