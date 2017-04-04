// Dependencies
const path = require('path')

// Helper functions
const absolute = (...paths) => path.join(process.env.PWD, ...paths)
const relative = (...paths) => path.relative(...paths)
const basename = (...paths) => path.basename(...paths)
const filetype = (...paths) => path.extname(...paths).slice(1)

// Get entry paths
const entry = (input, { paths }) => {

  const format = (data, { from, to }) => {
    data[ absolute(...paths, to) ] = absolute(from)
    return data
  }

  return input.reduce(format, {})

}

// Get file paths
const files = (input, { paths = '', flat = false }) => {

  const format = (item) => (!flat) ? ({
    from: absolute(item),
    to:   absolute(...paths, basename(item))
  }) : absolute(item)

  return input.map(format)

}

// Get server paths
const server = (input, { port }) => {

  const format = (data, { from, to }) => {
    data[to] = [ absolute(from),'webpack/hot/only-dev-server' ]
    return data
  }

  return input.reduce(format, {
    client: 'webpack-dev-server/client?http://localhost:' + port
  })

}

// Export module
module.exports = { absolute, relative, basename, filetype, entry, files, server }
