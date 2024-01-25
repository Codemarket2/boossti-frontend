import React from 'react';
import UserLayout from '../../src/components/common/UserLayout';
import RenderingList from '../../src/components/common/renderingList/renderingList';
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
        <RenderingList />
        {/* <FeedLayout/> */}
      </div>
    </UserLayout>
  );
}
