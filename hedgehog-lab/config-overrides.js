module.exports = function override(config) {
  config.module.rules = config.module.rules.concat([
    {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' },
    },
    ])
  return config
}
