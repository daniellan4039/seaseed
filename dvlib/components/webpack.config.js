const path = require('path')

module.exports = {
  mode: 'production', // other mode: development,
  watch: false, // if true, every time update source file, webpack will rebuild project.
  entry: './index.js',
  output: {
    filename: 'dvlib.js', // output file name
    path: path.resolve(__dirname, 'build')
  },
  // devtool: none, // see below
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: {
    'element-plus': {
      commonjs2: 'element-plus',
      commonjs: 'element-plus',
      root: 'element-plus'
    }
  }
}
