const {
  override,
  addBabelPlugin,
  getBabelLoader,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require("customize-cra");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { ESBuildPlugin } = require("esbuild-loader");

module.exports = (config, env) => {
  const prod = config.mode === "production";
  const babelLoader = getBabelLoader(config);

  return override(
    addWebpackModuleRule({
      test: /.tsx?$/,
      use: [
        {
          loader: "esbuild-loader",
          options: { loader: "tsx", target: "es2015" },
        },
      ],
    }),

    addWebpackModuleRule({
      test: /.jsx?$/,
      use: [
        {
          loader: "esbuild-loader",
          options: { loader: "jsx", target: "es2015" },
        },
      ],
    }),
    // You can choose to just use worker-loader! instead if you want
    addWebpackModuleRule({
      test: /\.worker\.[jt]sx?$/,
      use: [
        { loader: "worker-loader" },
        { loader: babelLoader.loader, options: babelLoader.options },
      ],
    }),
    addWebpackPlugin(new ESBuildPlugin()),
    !prod && addBabelPlugin("react-refresh/babel"),
    !prod && addWebpackPlugin(new ReactRefreshPlugin())
  )(config, env);
};
