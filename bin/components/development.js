// Dependencies
const Server  = require('webpack-dev-server')
const Webpack = require('./helpers/webpack')
const Package = require('./helpers/package')
const zaf     = require('./helpers/zaf')
const cli     = require('./helpers/cli')
const fs      = require('./helpers/fs')

// Get callee packages
const package  = new Package('package.json')
const manifest = new Package('manifest.json')

// Create a webpack proxy object
const createProxy = (assets, port, proxy = {}) => {

  assets.forEach(file => {

    const filename = fs.split(file).filename
    const path     = `/${filename}`

    proxy[path] = {
      target: `http://localhost:${port}/${file}`,
      pathRewrite: { [path]: '' }
    }

  })

  return proxy

}

// Module definition
module.exports = () => {

  // Settings
  const data  = package.data
  const port  = data.config && data.config.port || 4567
  const main  = data.main
  const files = fs.onlyFiles(data.assets)

  // Create dev server
  const dev_server = 'webpack-dev-server/client?http://localhost:' + port
  const hot_loader = 'webpack/hot/only-dev-server'

  // Add path to list
  const include = fs.map(main, file => {
    return fs.absolute(package.path, fs.split(file).filepath)
  })

  //
  const assets = {
    entry: fs.absolute(package.path, fs.split(main).filepath),
    files: fs.absolute(package.path, files),

    get value() {
      return fs.relative(assets.entry, assets.files)
    }
  }

  // Create entry points
  const entries = fs.absolute(package.path, files)
  const entry   = [dev_server, hot_loader, ...entries]

  // Server options
  const options = {
    quiet: true,
    hot: true,
    contentBase: include,

    proxy: createProxy(assets.value, port),

    setup: (express) => {

      // Create app.js from manifest.json
      const data = zaf.create(manifest.data, port)

      // Export app.js
      express.get('/app.js', (request, response) => {
        response.setHeader('content-type', 'application/javascript')
        response.send(data)
      })

    }
  }

  // Create development server
  const compiler = new Webpack({ entry, path: package.path, include })
  const server   = new Server(compiler, options)

  // Listen to server
  server.listen(port, 'localhost', error => {

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

  })

  // Return
  return server

}
