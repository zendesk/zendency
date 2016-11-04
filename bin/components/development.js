// Dependencies
const WebpackServer  = require('webpack-dev-server')
const webpack        = require('webpack')
const path           = require('path')
const cli            = require('.//helpers/cli.js')
const pathHelper     = require('./helpers/path-helper')
const webpackOptions = require('./helpers/webpack-options')

// Variables
const DEV_SERVER   = 'webpack-dev-server/client?http://localhost:';
const SYNTAX_ERROR = 'webpack/hot/only-dev-server';

// Module definition
const development = (port, { input, output }, parent) => {

  // split path into filepath and filename
  const { filepath, filename } = pathHelper.splitPath(output)

  // Create entries
  const entries = pathHelper.createArray([input], i => {
    return path.join(parent, i)
  })

  // Create entry point
  const entry = [DEV_SERVER + port, SYNTAX_ERROR].concat(entries)

  // Create includes for loaders
  const includes = pathHelper.createArray([input], i => {

    const { filepath } = pathHelper.splitPath(i)
    return path.join(parent, filepath)

  })

  // Setup webpack
  const settings = webpackOptions.development({ entry, filepath: parent, filename, includes })
  const compiler = webpack(settings)

  // Listener
  const onConnect = (error) => {

    // Return error
    if (error)
      return console.error(error)

    // Show success
    cli.clear()
    cli.line()
    cli.success('Completed')
    cli.line()
    cli.log('Listening at http://localhost:' + port)
    cli.line()

  }

  // Create server
  const webpackServer = new WebpackServer(compiler, {

    quiet: true,
    contentBase: path.join(parent, filepath),
    hot: true,
    stats: { colors: true }

  }).listen(port, 'localhost', onConnect)

  // Return server
  return webpackServer

}

// Exporter
module.exports = development
