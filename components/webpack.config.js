const path = require('path')
module.exports = {
    mode: "production", // other mode: development,
    watch: false, // if true, every time update source file, webpack will rebuild project.
    entry: "./src/index.js",
    output: {
        filename: "main.js", // output file name
        path: path.resolve(__dirname, 'build')
    },
    devtool: none, // see below
    module: {
        rules: [
            // ... setting
        ]
    }
}