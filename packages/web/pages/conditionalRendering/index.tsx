import React from 'react';
import UserLayout from '../../src/components/common/UserLayout';
import ConditionalRendering from '../../src/components/conditionalRendering/conditionalRendering';

import ConditionalRendering1 from '../../src/components/conditionalRendering/conditionalRenderingWithNull';

import ConditionalRendering2 from '../../src/components/conditionalRendering/conditionalRenderingOperater';
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
        <p>Just Checking</p>
        <ConditionalRendering />
        <ConditionalRendering1 />
        <ConditionalRendering2 />
      </div>
    </UserLayout>
  );
}
