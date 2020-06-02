const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || ‘0.0.0.0’;
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),

    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src', 'main', 'resources','static', 'js'),
    },
    devServer: {
     disableHostCheck: true,
     contentBase: ‘./dist’,
     compress: true,
     inline: true,
     port:server_port,
     host:server_host

    }
});