const path = require('path');

const appDirectory = path.resolve(__dirname);
const compileNodeModules = ['react-native-vector-icons'].map(moduleName =>
  path.resolve(appDirectory, `node_modules/${moduleName}`),
);

const babelLoaderConfiguration = {
  test: /\.js$|tsx$|ts?$/,
  include: [...compileNodeModules],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: ['react-native-web'],
    },
  },
};

// ADD THIS LINE HERE (ttfLoaderConfiguration)
const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'url-loader',
  include: [path.resolve('../../packages/storybook/node_modules/react-native-vector-icons')],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  stories: ['../stories/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: ['react-native-reanimated', 'react-native-vector-icons'],
        babelPlugins: ['react-native-reanimated/plugin'],
      },
    },
  ],
  framework: '@storybook/react',
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native-web': path.resolve('../../packages/storybook/node_modules/react-native-web'),
    };
    config.module.rules = [...config.module.rules, babelLoaderConfiguration, ttfLoaderConfiguration];
    return config;
  },
};
