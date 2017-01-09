// Dependencies
const webpack = require('webpack')
const Server  = require('webpack-dev-server')
const loaders = require('./loaders')
const options = require('./options')

// Create compiler
const Compiler = function({ entry, plugins, path }) {

  // Create options and return webpack
  const settings = options({ entry, plugins, path, loaders })
  const compiler = webpack(settings)

  // Return API endpoints
  return {
    listen:  (...args) => listen(compiler, ...args),
    compile: (...args) => compile(compiler, ...args)
  }

}

// Create server
const listen = (compiler, port, options, callback) => {

  const server = new Server(compiler, options)
  server.listen(port, 'localhost', callback)

}

// Run compiler
const compile = (compiler, callback) =>
  compiler.run(callback)

// Export module
module.exports = Compiler
module.exports.CopyPlugin = require('copy-webpack-plugin')
module.exports.HotModulePlugin = webpack.HotModuleReplacementPlugin
