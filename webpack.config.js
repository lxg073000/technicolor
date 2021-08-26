const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 200,
  //   poll: 1000,
  // },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
  },

  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },

  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].bundle.js",
    // // assetModuleFilename: "images/[hash][ext][query]",
    // assetModuleFilename: "dist/[name][ext]",
    assetModuleFilename: "./images/[name][ext]",
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      title: "Technicolor",
      template: path.resolve(__dirname, "./src/index.html"), // template file
      filename: "index.html", // output file
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },

          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  resolveLoader: {
    modules: [path.join(__dirname, "node_modules")],
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    alias: {
      xyz$: path.resolve(__dirname, "path/to/file.js"),
    },
  },
};
