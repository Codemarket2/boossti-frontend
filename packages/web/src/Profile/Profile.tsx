import React from 'react';

const Profile1 = () => (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
    <p>Katherine Johnson</p>
  </div>
);

const Profile2 = () => (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Issac Newton" />
    <p>Issac Newton</p>
  </div>
);

const Profile3 = () => (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Albert Einstein" />
    <p>Albert Einstein</p>
  </div>
);

const Gallery = () => (
  <section>
    <h1>Amazing scientists</h1>
    <Profile1 />
    <Profile2 />
    <Profile3 />
  </section>
);

export default Gallery;
