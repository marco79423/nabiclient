module.exports = {
  webpack: (config) => {
    Object.assign(config, {target: 'electron-renderer',})
    config.output.globalObject = 'this'
    return config
  },
}
