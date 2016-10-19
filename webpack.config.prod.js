var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
        devtool: 'source-map',
        entry: __dirname + '/app/index.jsx',
        output: {
                path: __dirname + '/app/dist',
                filename: 'bundle.js'
        },
        plugins: [
                new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.DefinePlugin({
                        'process.env': {
                                'NODE_ENV': "'production'"
                        }
                }),
                new webpack.optimize.UglifyJsPlugin({
                        compressor: {
                                warnings: false
                        }
                }),
                new WebpackNotifierPlugin()
        ],
        module:
        {
                loaders:
                [
                {
                        test: /\.jsx?/,
                        loaders: ['react-hot','babel'],
                        include: path.join(__dirname, 'app')
                },
                {
                        test: /\.less$/,
                        loader: 'style!css!less'
                }
                ]
        }
};