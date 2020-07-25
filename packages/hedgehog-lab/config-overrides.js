const {
  override,
  addBabelPlugin,
  getBabelLoader,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require('customize-cra');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (config, env) => {
  const prod = config.mode === 'production';
  const babelLoader = getBabelLoader(config);

  return override(
    // You can choose to just use worker-loader! instead if you want
    addWebpackModuleRule({
      test: /\.worker\.[jt]sx?$/,
      use: [
        { loader: 'worker-loader' },
        { loader: babelLoader.loader, options: babelLoader.options },
      ],
    }),

    !prod && addBabelPlugin('react-refresh/babel'),
    !prod && addWebpackPlugin(new ReactRefreshPlugin())
  )(config, env);
};
