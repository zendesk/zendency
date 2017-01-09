// Create webpack loaders
module.exports = [{

  test: /\.(html?|handlebars|hbs)$/,
  exclude: /node_modules/,
  loader: 'handlebars-loader'

},{

  test: /\.(jpe?g|png|gif|svg)$/,
  exclude: /node_modules/,
  loader: 'file-loader',
  query: {
    name: '[name].[ext]'
  }

}, {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'react-hot'

},{

  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel'

},{

  test: /\.css$/,
  exclude: /node_modules/,
  loader: 'style-loader'

},{

  test: /\.css$/,
  exclude: /node_modules/,
  loader: 'css-loader',
  query: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[local]-[hash:base64:5]'
  }

},{

  test: /\.json$/,
  exclude: /node_modules/,
  loader: 'json-loader'

}]
