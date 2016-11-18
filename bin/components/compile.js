// Dependencies
const webpack = require('webpack')
const Package = require('./helpers/package')
const zaf     = require('./helpers/zaf')
const cli     = require('./helpers/cli')
const fs      = require('./helpers/fs')

// Get callee packages
const package  = new Package('package.json')
const manifest = new Package('manifest.json')

// Module definition
module.exports = () => {

  // Settings
  const data  = package.data
  const main  = data.main

  const include = fs.map(main, file => {
    return fs.absolute(package.path, fs.split(file).filepath)
  })

  console.log(main);

  // Run webpack
  const compile = webpack({
    entry: main,

    output: {
      path: package.path,
      filename: 'baldvin_bundle.js',
      libraryTarget: 'umd'
    },

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
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader'
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
    }
  })

  compile.run((error, stats) => {

    // Return error
    if (error)
      return console.error(error);

    // Show success
    console.log('Build compiled');

  });

}
