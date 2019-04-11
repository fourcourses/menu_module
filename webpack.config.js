const path = require('path')
const enter = path.join(__dirname, '/client/src/')
const out = path.join(__dirname, 'public')
module.exports = {
  entry: `${enter}/index.jsx`,
  output: {
    path: out,
    filename: 'bundle.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: enter,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
  ]
  }
};