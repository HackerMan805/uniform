const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'libs')
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./src/sass']
                        }
                    }
                ]
            }
        ]
    }
};
