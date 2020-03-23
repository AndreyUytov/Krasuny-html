const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const  cssnano  =  require ( "cssnano" ) ;

module.exports = env => {
  const isProduction = env.production === true;

  return {
    context: path.resolve(__dirname, "src"),
    mode: isProduction ? "production" : "development",
    entry: {
      index: './index.js',
      catalog: './catalog.js'
    },
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: "/",
      filename: "[name].js",
    },

    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      contentBase: path.join(__dirname, "dist"),
      watchContentBase: true,
      publicPath: '/'
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles/[name].css"
      }),
      new webpack.HotModuleReplacementPlugin()
    ],

    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                reloadAll: true,
                sourceMap: true
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [
                  (() => {
                    if (isProduction) {
                      return autoprefixer(), cssnano();
                    } else return autoprefixer();
                  })()
                ],
                sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: path.join(__dirname, 'dist')
              }
            },
            {
              loader: "extract-loader"
            },
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|svg|webp)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                publicPath: (url, resourcePath, context) => {
                  return `./${url}`
                }
              }
            }
          ]
        },
      ]
    }

  }
}  