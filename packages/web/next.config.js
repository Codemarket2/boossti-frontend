const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const withTM = require('next-transpile-modules')(['@frontend/shared', '@frontend/template']);

module.exports = withPlugins([withTM, withImages]);
