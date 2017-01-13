// Dependencies
const Compiler = require('./helpers/compiler')
const paths    = require('./helpers/paths')

// Module definition
module.exports = ({ compiler: input, files, directories }, dist) => {

  // Create file paths
  const entry = paths.entry(input, { paths: [dist, '/assets/'] })
  const copy  = paths.files(files, { paths: [dist, '/assets/'] })

  // Copy manifest and translations to bundle
  copy.push({
    from: paths.absolute('manifest.json'),
    to:   paths.absolute(dist, 'manifest.json')
  }, {
    from: paths.absolute(directories.translations),
    to:   paths.absolute(dist, paths.basename(directories.translations))
  })

  // Initiate plugins
  const plugins = [
    new Compiler.CopyPlugin(copy)
  ]

  // Create and run compiler
  const compiler = new Compiler({ entry, plugins })
  compiler.compile(error => {})

}
