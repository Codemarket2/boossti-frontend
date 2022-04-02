import projectConfig from '@frontend/shared';
import React from 'react';

export default function home() {
  return (
    <div>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <p>{projectConfig.title}</p>
    </div>
  );
}
