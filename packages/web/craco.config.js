const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { getWebpackTools, getMonorepoRoot } = require('react-native-monorepo-tools');

const webpackTools = getWebpackTools();
const monorepoRoot = getMonorepoRoot();

const currentWorkspace = 'web';
// craco babel loader
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: {
    alias: {
      react: `${monorepoRoot}/packages/${currentWorkspace}/node_modules/react`,
      'react-native': `${monorepoRoot}/packages/${currentWorkspace}/node_modules/react-native-web`,
    },
    configure: webpackConfig => {
      webpackConfig.externals = {
        ...webpackConfig.externals,
      };
      webpackConfig.module.rules = [...webpackConfig.module.rules];

      // Allow importing from external workspaces.
      webpackTools.enableWorkspacesResolution(webpackConfig);
      // Ensure nohoisted libraries are resolved from this workspace.
      // Set webpackConfig.resolve.alias with nohoist settings
      webpackTools.addNohoistAliases(webpackConfig);
      return webpackConfig;
    },
    plugins: [
      // Inject the React Native "__DEV__" global variable.
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV != 'production',
      }),
    ],
  },
  eslint: {
    enable: false,
  },
  babel: {
    presets: ['@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-export-namespace-from', 'react-native-reanimated/plugin'],
  },
  plugins: [
    {
      plugin: require('craco-babel-loader'),
      options: {
        includes: [
          resolveApp('../../node_modules/react-native-vector-icons'),
          resolveApp('../../node_modules/@react-native-async-storage/async-storage'),
        ],
      },
    },
  ],
};
