const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const { getWebpackTools, getMonorepoRoot } = require('react-native-monorepo-tools');

const webpackTools = getWebpackTools();
const monorepoRoot = getMonorepoRoot();

const currentWorkspace = 'extensions';

// craco babel loader
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: {
    alias: {
      // 'react-native$': 'react-native-web',
      react: `${monorepoRoot}/packages/${currentWorkspace}/node_modules/react`,
      'react-native': `${monorepoRoot}/packages/${currentWorkspace}/node_modules/react-native-web`,
    },
    configure: webpackConfig => {
      webpackConfig.externals = {
        ...webpackConfig.externals,
      };
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
      };
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        {
          test: /\.ttf$/,
          loader: 'url-loader',
          include: path.resolve(monorepoRoot, 'node_modules', 'react-native-vector-icons'),
        },
      ];

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
    enable: true,
  },
  babel: {
    presets: [],
    plugins: [],
  },
  typescript: {
    enableTypeChecking: true,
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
