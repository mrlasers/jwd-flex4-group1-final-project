import "webpack-dev-server"

import HtmlWebpackPlugin from "html-webpack-plugin"
import Path from "path"
import ReactRefreshTypeScript from "react-refresh-typescript"
import { Configuration } from "webpack"
import { merge } from "webpack-merge"

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

const commonConfig: Configuration = {
  entry: {
    react: "./src/react/index.tsx",
    vanilla: "./src/vanilla/scripts/app.ts",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    filename: "[name].[fullhash].js",
    path: Path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React TypeScript Webpack App",
      xhtml: true,
      chunks: ["react"],
    }),
    new HtmlWebpackPlugin({
      title: "Vanilla TypeScript Webpack App",
      xhtml: true,
      template: "./src/vanilla/template.html",
      filename: "vanilla.html",
      chunks: ["vanilla"],
    }),
  ],
}

const devConfig: Configuration = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  devtool: "inline-source-map",
  devServer: {
    // static: {
    //   directory: Path.join(__dirname, "public"),
    // },
    hot: true,
    compress: false,
    port: 8080,
  },
  performance: {
    hints: false,
  },
}

export default merge(commonConfig, devConfig)
