// Dependencies
const Compiler = require('./helpers/compiler')
const json     = require('./helpers/json')

// Module definition
module.exports = ({ main, files, config }, manifest) => {

  // Format data
  const format = (file) =>
    json.paths({ main, file })

  // Create file paths
  const entry = files.map(format).filter(json.hasJS).reduce(json.server, {
    client: 'webpack-dev-server/client?http://localhost:' + config.port
  })

  // Initiate plugins
  const plugins = [
    new Compiler.HotModulePlugin()
  ]

  // Create development server
  const compiler = new Compiler({ entry, plugins, path: '/' })

  // Run server on port
  compiler.listen(config.port, { hot: true, contentBase: json.absolute(main) }, error => {})

}
