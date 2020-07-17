module.exports = function override(config) {
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' },
  })
  return config
}
