// Webpack options
module.exports = ({ entry, plugins, loaders, path }) => ({

  entry,
  plugins,

  output: {
    path,
    filename: '[name]'
  },

  module: {
    loaders
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  externals: {
    ZAFClient: 'ZAFClient'
  },

  devtool: 'source-map'

})
