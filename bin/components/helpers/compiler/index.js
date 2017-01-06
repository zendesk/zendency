// Dependencies
const webpack = require('webpack')
const loaders = require('./loaders')
const options = require('./options')

// Module definition
const Compiler = function({ entry, plugins, path }) {

  // Create options and return webpack
  const opts = options({ entry, plugins, path, loaders })
  return webpack(opts)

}

// Export module
module.exports = Compiler
module.exports.Server = require('webpack-dev-server')
module.exports.CopyPlugin = require('copy-webpack-plugin')
module.exports.HotModulePlugin = webpack.HotModuleReplacementPlugin
