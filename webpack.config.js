const path = require('path')
const enter = path.join(__dirname, './client/index.jsx')
const out = path.join(__dirname, 'public')
module.export = {
  entry: enter,
  output: {
    path: out,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      use:{
        loader: 'babel-loader',
        options: {
          preset: ['@babel/preset-react']
        }
      }
    }]
  }
};