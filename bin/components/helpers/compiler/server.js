// Dependencies
const Server = require('webpack-dev-server')
const client = require('./client')

// Setup router
const router = (manifest, port) => (express) => {

  if (!manifest.version)
    return;

  // Create app.js from manifest.json
  const data = client.create(manifest, port)

  // Export app.js
  express.get('/app.js', (request, response) => {
    response.setHeader('content-type', 'application/javascript')
    response.send(data)
  })

}

// Server options
const options = (contentBase, setup) => ({
  hot:   true,
  quiet: true,

  headers: {
    'Access-Control-Allow-Origin': '*'
  },

  contentBase, setup
})

// Start server
const run = (compiler, { port, base, manifest }, callback) => {

  const route = router(manifest, port)
  const opts  = options(base, route)

  const server = new Server(compiler, opts)
  server.listen(port, 'localhost', callback)

}

// Export module
module.exports = { run }
