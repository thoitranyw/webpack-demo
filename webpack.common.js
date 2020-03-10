const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");

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
    // devtool: 'cheap-source-map',
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
        }),
        // new CopyWebpackPlugin([
        //     {
        //       from: path.resolve(__dirname, 'src/'),
        //       to: path.resolve(__dirname, 'dist/')
        //     }
        //   ]),
      ]
};