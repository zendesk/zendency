// Dependencies
const webpack = require('webpack')
const server  = require('./server')
const options = require('./options')
const loaders = require('./loaders')

// Compiler actions
const listen  = (compiler, ...args)  => server.run(compiler, ...args)
const compile = (compiler, callback) => compiler.run(callback)

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

// Export module
module.exports = Compiler

// Export child modules
module.exports.CopyPlugin      = require('copy-webpack-plugin')
module.exports.HotModulePlugin = webpack.HotModuleReplacementPlugin
module.exports.NoErrorsPlugin  = webpack.NoErrorsPlugin
