// babel.config.js
module.exports = {
  presets: [['next/babel', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [['@babel/plugin-proposal-class-properties']],
};
