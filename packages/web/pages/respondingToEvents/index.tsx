import React from 'react';
import UserLayout from '../../src/components/common/UserLayout';
import Profile from '../../src/components/Profile/Profile';
import FeedLayout from '../../src/components/form2/feed/FeedLayout';
import RespondingToEvents from '../../src/components/respondingToEvents/respondingToEvents';

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
        <RespondingToEvents />
        {/* <FeedLayout/> */}
      </div>
    </UserLayout>
  );
}
