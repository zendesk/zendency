// Dependencies
const Compiler  = require('./helpers/compiler')
const json      = require('./helpers/json')
const zafClient = require('./helpers/zafClient')

// Module definition
module.exports = ({ main, files, config }, manifest) => {

  // Format data
  const format = (file) =>
    json.paths({ main, file })

  // Create file paths
  const base  = json.absolute(main)
  const entry = files.map(format).filter(json.hasJS).reduce(json.server, {
    client: 'webpack-dev-server/client?http://localhost:' + config.port
  })

  // Initiate plugins
  const plugins = [
    new Compiler.HotModulePlugin()
  ]

  // Create development server
  const compiler = new Compiler({ entry, plugins, path: '/' })

  // Server setup
  const setup = (express) => {

    if (!manifest.version)
      return;

    // Create app.js from manifest.json
    const data = zafClient.create(manifest, config.port)

    // Export app.js
    express.get('/app.js', (request, response) => {
      response.setHeader('content-type', 'application/javascript')
      response.send(data)
    })

  }

  // Run server on port
  compiler.listen(config.port, { hot: true, quiet: true, contentBase: base, setup }, error => {
    console.log(`localhost:${config.port}`)
  })

}
