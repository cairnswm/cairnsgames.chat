const deps = require('./package.json').dependencies

module.exports = {
  name: 'chat',
  filename: 'chat.js',
  exposes: {
    './chat': './src/components/chat.js'
  },  
  shared: {
    ...deps,
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
  }
}
