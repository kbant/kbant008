module.exports = {
  stories: ['../stories/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-ondevice-notes',
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-actions',
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native-web': path.resolve('../../packages/storybook/node_modules/react-native-web'),
    };
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(monorepoRoot, 'node_modules', 'react-native-vector-icons'),
      },
    ];
    return config;
  },
};
