const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    publicPath: isProd ? "/gamedex-v2/" : "/", 
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: "body",
      publicPath: "/gamedex-v2/", 
    }),
  ],

  devServer: {
    static: path.join(__dirname, "public"),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  performance: {
    hints: false,
  },
};
