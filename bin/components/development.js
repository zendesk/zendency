// Dependencies
const Compiler  = require('./helpers/compiler')
const paths     = require('./helpers/paths')

// Module definition
module.exports = ({ compiler: input, files, directories = {}, main, config }, manifest) => {

  // Create file paths
  const entry = paths.server(input, { port: config.port })
  const copy  = paths.files(files, { flat: true })
  const base  = paths.absolute(main)

  // Add files to entry
  entry.files = copy

  // Initiate plugins
  const plugins = [
    new Compiler.HotModulePlugin()
  ]

  // Proxy translations files
  const translationPath = paths.relative(main, directories.translations);
  const proxy = directories.translations ? {
    '/translations/*.json': {
      target: `http://localhost:${ config.port }`,
      pathRewrite: (path, req) => translationPath + '/' + path.split('/').pop()
    }
  } : {}

  // Server options
  const options = {
    port: config.port,
    base, manifest, proxy
  }

  // Create development server
  const compiler = new Compiler({ entry, plugins, path: '/' })
  compiler.listen(options, error => {
    console.log('localhost:' + config.port)
  })

}
