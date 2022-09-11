import 'webpack-dev-server'

import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as Path from 'path'
import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

const commonConfig: Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: Path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React TypeScript Webpack App",
      xhtml: true,
    }),
  ],
}

const devConfig: Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    // static: {
    //   directory: Path.join(__dirname, "public"),
    // },
    compress: false,
    port: 9001,
  },
  performance: {
    hints: false,
  },
}

export default merge(commonConfig, devConfig)
