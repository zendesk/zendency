// Create webpack loaders
module.exports = [{

  test: /\.(html?|handlebars|hbs)$/,
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
  loader: 'style-loader'

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
