module.exports = {
  rootDir: './../../',
  testPathIgnorePatterns: [
    '<rootDir>/packages/mobile/',
    '<rootDir>/packages/web/.next/',
    '<rootDir>/node_modules/',
  ],
  moduleDirectories: ['node_modules', './'],
  modulePaths: ['node_modules', './'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/packages/web/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/packages/web/__mocks__/styleMock.js',
  },
};

// "jest": {
//     "rootDir": "./../../",
//     "testPathIgnorePatterns": [
//       "<rootDir>/packages/mobile/",
//       "<rootDir>/packages/web/.next/",
//       "<rootDir>/node_modules/"
//     ],
//     "moduleDirectories": [
//       "node_modules",
//       "./"
//     ],
//     "modulePaths": [
//       "node_modules",
//       "./"
//     ],
//     "transform": {
//       "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
//     },
//     "moduleNameMapper": {
//       "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/packages/web/__mocks__/fileMock.js",
//       "\\.(css|less)$": "<rootDir>/packages/web/__mocks__/styleMock.js"
//     }
//   },
