// Dependencies
const WebpackServer  = require('webpack-dev-server')
const webpack        = require('webpack')
const path           = require('path')
const cli            = require('.//helpers/cli.js')
const pathHelper     = require('./helpers/path-helper')
const webpackOptions = require('./helpers/webpack-options')

// Module definition
const production = ({ input, output }, parent) => {

  // Add to terminal
  cli.clear()
  cli.line()
  cli.list('Copy files', { type:'on' })
  cli.list('Compile',    { type:'off' })

  // Loop through and copy assets
  const assets = parent.assets || []

  assets.forEach(file => {
    fs.createReadStream(file).pipe(fs.createWriteStream('./app/assets/' + path.basename(file)))
  });

  // Add to terminal
  cli.move(-2)
  cli.list('Copy files', { type:'done' })
  cli.list('Compile',    { type:'on' })

  // split path into filepath and filename
  const { filepath, filename } = pathHelper.splitPath(output)

  // Create includes for loaders
  const includes = pathHelper.createArray([input], i => {

    const { filepath } = pathHelper.splitPath(i)
    return path.join(parent, filepath)

  })

  // Setup webpack
  const settings = webpackOptions.production({ entry: [input], filepath, filename, includes })
  const compiler = webpack(settings)

  compiler.run((error, stats) => {

    // Return error
    if (error)
      return console.error(error)

    // Add to terminal
    cli.move(-2)
    cli.list('Copy files', { type:'done' })
    cli.list('Compile',    { type:'done' })
    cli.line()
    cli.success('Build completed')
    cli.line()

  })

}

// Exporter
module.exports = production
