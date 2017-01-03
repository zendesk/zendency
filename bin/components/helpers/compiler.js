// Global dependencies
const Webpack    = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

// Webpack options
const Options = ({ entry, copy, plugins }) => ({

  entry,
  plugins,

  output: {
    filename: '[name]'
  },

  module: {

    loaders: [{
      test: /\.html?$/,
      loader: 'handlebars-loader'
    },{
      test: /\.handlebars$/,
      loader: 'handlebars-loader'
    },{
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    },{
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'file-loader',
      query: {
        name: '[name].[ext]'
      }
    },{
      test: /\.jsx?$/,
      loader: 'react-hot'
    },{
      test: /\.jsx?$/,
      loader: 'babel'
    },{
      test: /\.css$/,
      loader: 'style-loader',
      query: {}
    },{
      test: /\.css$/,
      loader: 'css-loader',
      query: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[local]-[hash:base64:5]'
      }
    },{
      test: /\.json$/,
      loader: 'json-loader'
    }]

  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  externals: {
    ZAFClient: 'ZAFClient'
  }

})

// Module definition
const Compiler = function({ entry, copy }) {

  // Compiler plugins
  const plugins = [
    //new Webpack.HotModuleReplacementPlugin,
    new CopyPlugin(copy)
  ]

  // Create webpack options
  const options = Options({ entry, copy, plugins })
  const webpack = Webpack(options)

  // Return webpack
  return webpack

}

// Export module
module.exports = Compiler
