const {i18n} = require('./next-i18next.config')

module.exports = {
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
  serverRuntimeConfig: {
    backendUrl: 'http://localhost:9001',
  },
  i18n
}
