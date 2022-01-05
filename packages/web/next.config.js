const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa')({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});

const withTM = require('next-transpile-modules')(['@frontend/shared', '@frontend/ckeditor']);

module.exports = withPlugins([withTM, withImages]);
// module.exports = withPlugins([withPWA, withTM, withImages]);
