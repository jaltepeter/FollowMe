const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    name: 'followme',
    entry: {
        index: './src/scripts/followme.js'
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: 'modules/followme/scripts/',
        filename: 'followme.js',
        chunkFilename: 'bundles/[name].[chunkhash:4].js',
        path: path.resolve(__dirname, 'dist/scripts/'),
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};