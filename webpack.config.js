const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");

module.exports = env => {
  const isProduction = env.production === true;

  return {
    context: path.resolve(__dirname, "src"),

    mode: isProduction ? "production" : "development",

    entry: {
      index: "./index.js"
    },

    output: {
      path: path.join(__dirname, "build"),
      publicPath: "/",
      filename: "js/index.js",
      library: "index"
    },

    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      contentBase: path.resolve(__dirname, "build"),
      publicPath: "/",
      watchContentBase: true,
      openPage: "index.html",
      historyApiFallback: true,
    },

    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true
        })
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "index.css"
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
                hmr: isProduction ? false : true,
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
          test: /\.(png|jpe?g|gif|woff|woff2|svg|webp)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                publicPath: (url, resourcePath, context) => {
                  if (/img/.test(resourcePath)) {
                    return `${url}`;
                  } else {
                    return `../${url}`;
                  }
                }
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
                name: "[path][name].[ext]"
              }
            },
            {
              loader: "extract-loader"
            },
            {
              loader: "html-loader",
              options: {
                attrs: ["img:src"]
              }
            }
          ]
        }
      ]
    }
  };
};
