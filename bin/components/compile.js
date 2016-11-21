// Dependencies
const Webpack = require('./helpers/webpack')
const Package = require('./helpers/package')
const zaf     = require('./helpers/zaf')
const cli     = require('./helpers/cli')
const fs      = require('./helpers/fs')

// Get callee packages
const package  = new Package('package.json')
const manifest = new Package('manifest.json')

// Module definition
module.exports = () => {

  // Settings
  const data  = package.data
  const main  = data.main
  const files = fs.onlyFiles(data.assets)

  // Add path to list
  const include = fs.map(main, file => {
    return fs.absolute(package.path, fs.split(file).filepath)
  })

  // Create entry point
  const entry = fs.absolute(package.path, files)

  // Add copy path
  const copy = [{
    from: fs.absolute(package.path, 'manifest.json'),
    to:   fs.absolute(package.path, '/app/manifest.json')
  }, {
    from: fs.absolute(package.path, data.main),
    to:   fs.absolute(package.path, 'app/assets/index.html')
  }, {
    from: fs.absolute(data.translation, '**/*'),
    to:   fs.absolute(package.path, 'app/translation/[name].[ext]')
  }]

  // Run webpack
  const compiler = new Webpack({ entry, path: package.path + '/app/assets/', include, copy })

  // Run compiler
  compiler.run((error, stats) => {

    // Return error
    if (error)
      return console.error(error)

    // Show success
    cli.clear()
    cli.line()
    cli.success('Compiled')
    cli.line()

  })

}
