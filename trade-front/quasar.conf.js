const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = function (/* ctx */) {
  return {
    supportTS: false,

    boot: [
      'navigation-guards',
      'axios',
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'fontawesome-v5',
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
      'material-icons-outlined'

    ],

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history', // available values: 'hash', 'history'
      showProgress: true,
      gzip: false,
      analyze: false,
      extendWebpack(cfg) {
      },

      chainWebpack(chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
      },
      env: require('dotenv').config().parsed
    },

    devServer: {
      https: false,
      port: 8080,
      open: true
    },

    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      config: {},
      importStrategy: 'auto',
      plugins: [
        'Notify',
        'LocalStorage',
        'Cookies'
      ]
    },

    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {},
      manifest: {
        name: `Quasar App`,
        short_name: `Quasar App`,
        description: `A Quasar Framework app`,
        display: 'standalone',
        orientation: 'portrait',
      }
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {},

      builder: {

        appId: 'back_office'
      },
      nodeIntegration: true,
      extendWebpack(/* cfg */) { }
    }
  }
}
