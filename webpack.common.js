const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const NodeEnvPlugin = require('node-env-webpack-plugin');
const confEnv = require('./config')

const defineEnv = {
    API_ORIGIN: JSON.stringify(confEnv.get('api')),
    ENV: JSON.stringify(confEnv.get('env')),
    SENTRY_URI: JSON.stringify(confEnv.get('sentry'))
}

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.scss']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [ 
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader',
                ],
              }
        ]
    },
    plugins: [
        new NodeEnvPlugin(),
        new webpack.DefinePlugin(defineEnv),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./index.html",
            filename: "index.html"
        })
      ]
};