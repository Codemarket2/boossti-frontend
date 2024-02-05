/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

// const withPWA = require('next-pwa')({
//   pwa: {
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//     disable: process.env.NODE_ENV === 'development',
//   },
// });

const withTM = require('next-transpile-modules')(['@frontend/shared']);

module.exports = withPlugins([withTM, withImages], {
  images: {
    disableStaticImages: true,
  },
  experimental: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // typescript: {
  //   tsconfig: 'G:Boossti\boossti-frontendpackagesweb\tsconfig.json',
  // },
  // swcMinify: true,
});

// module.exports = withPlugins([withPWA, withTM, withImages]);
