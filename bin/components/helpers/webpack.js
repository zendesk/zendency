// Global dependencies
const webpack = require('webpack')

//
const options = ({ entry, path, include }) => ({

  entry,

  output: {
    path,
    filename: '[name].js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin
  ],

  module: {

    loaders: [{
      include,
      test: /\.html?$/,
      loader: 'handlebars-loader'
    },{
      include,
      test: /\.handlebars$/,
      loader: 'handlebars-loader'
    },{
      include,
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    },{
      include,
      test: /\.jsx?$/,
      loader: 'react-hot'
    },{
      include,
      test: /\.jsx?$/,
      loader: 'babel'
    },{
      include,
      test: /\.css$/,
      loader: 'style-loader',
      query: {}
    },{
      include,
      test: /\.css$/,
      loader: 'css-loader',
      query: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[local]-[hash:base64:5]'
      }
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
class Webpack {

  constructor(args, opts = options(args)) {
    return webpack(opts)
  }

}

// Export module
module.exports = Webpack;
