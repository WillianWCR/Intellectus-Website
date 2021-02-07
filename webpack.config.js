const path = require('path');

module.exports = {
    entry: {
        app: './js/script.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'script.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }

}