const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer,
  addWebpackPlugin,
  addBabelPlugin,
  disableEsLint,
  adjustWorkbox
} = require('customize-cra');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { addReactRefresh } = require('customize-cra-react-refresh');
const rewireHappyPackLoader = require('react-app-rewire-happy-pack');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const devServerConfig = () => config => {
  return {
    ...config,
    proxy: {
      '/pdc-api-gateway': {
        target: 'http://192.168.0.1',
        changeOrigin: true,
        secure: false,
      },
      '/pfs-web': {
        target: 'http://192.168.0.1',
        changeOrigin: true,
        secure: false,
      },
    },
  };
};
// const useSMP = () => config => new SpeedMeasurePlugin().wrap(config);
const useHappyPack = () => config => rewireHappyPackLoader(config);
const rewiredMap = ()=> config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  return config;
};

module.exports = {
  webpack: override(
    addReactRefresh(),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    // disable eslint in webpack
    disableEsLint(),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        '@font-family': 'Porsche Next',
      },
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      _styles: path.resolve(__dirname, 'src/styles'),
    }),
    addBabelPlugin(['@babel/plugin-proposal-decorators', { legacy: true }]),
    adjustWorkbox(wb =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat("index.html")
      })
    ),
    rewiredMap(),
    useHappyPack(),
  ),
  devServer: overrideDevServer(devServerConfig()),
};
