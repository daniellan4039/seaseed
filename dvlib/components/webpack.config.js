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
      // ... setting
    ]
  }
}
