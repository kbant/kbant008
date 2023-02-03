const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');
const { getMetroTools, getMetroAndroidAssetsResolutionFix } = require('react-native-monorepo-tools');

const metroTools = getMetroTools();

function getNohoistedPackages() {
  const nohoist = ['**/react', '**/react-native', '**/react-native-web', '**/react-native-safe-area-context'];
  const nohoistedPackages = nohoist
    .filter(packageNameGlob => !packageNameGlob.endsWith('**'))
    .map(packageNameGlob => packageNameGlob.substring(3));
  return nohoistedPackages;
}

function getMetroNohoistSettings({ dir, workspaceName, reactNativeAlias } = {}) {
  const nohoistedPackages = getNohoistedPackages();
  const blockList = [];
  const extraNodeModules = {};
  nohoistedPackages.forEach(packageName => {
    extraNodeModules[packageName] =
      reactNativeAlias && packageName === 'react-native'
        ? path.resolve(dir, `./node_modules/${reactNativeAlias}`)
        : path.resolve(dir, `./node_modules/${packageName}`);
    const regexSafePackageName = packageName.replace('/', '\\/');
    blockList.push(new RegExp(`^((?!${workspaceName}).)*\\/node_modules\\/${regexSafePackageName}\\/.*$`));
  });
  return { extraNodeModules, blockList };
}

const nohoistSettings = getMetroNohoistSettings({
  dir: __dirname,
  workspaceName: 'storybook',
});

console.log(metroTools.blockList);
console.log(metroTools.extraNodeModules);

console.log(nohoistSettings.blockList);
console.log(nohoistSettings.extraNodeModules);

const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

module.exports = {
  transformer: {
    publicPath: androidAssetsResolutionFix.publicPath,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  server: {
    // ...and to the server middleware.
    enhanceMiddleware: middleware => {
      return androidAssetsResolutionFix.applyMiddleware(middleware);
    },
  },
  // Add additional Yarn workspace package roots to the module map.
  // This allows importing importing from all the project's packages.
  watchFolders: metroTools.watchFolders,
  resolver: {
    // Ensure we resolve nohoist libraries from this directory.
    blockList: exclusionList(nohoistSettings.blockList),
    extraNodeModules: nohoistSettings.extraNodeModules,
  },
};
