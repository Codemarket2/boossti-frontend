const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const withTM = require('next-transpile-modules')(['@frontend/shared', '@frontend/ckeditor']);

module.exports = withPlugins([withTM, withImages]);
