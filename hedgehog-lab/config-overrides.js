module.exports = function override(config) {
  config.module.rules = config.module.rules.concat([
    {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' },
    }, {
      test: /\.txt$/i,
      use: 'raw-loader',
    }
  ])
  return config
}
