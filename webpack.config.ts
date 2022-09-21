import "webpack-dev-server"

import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import Path from "path"
import ReactRefreshTypeScript from "react-refresh-typescript"
import * as Webpack from "webpack"
import { merge } from "webpack-merge"

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

const isDev = process.env.NODE_ENV !== "production"

const commonConfig: Webpack.Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: Path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new ExtractTextPlugin({
    //   filename: "bundle.css",
    //   disable: false,
    //   allChunks: true,
    // }),
  ],
}

const devConfig: Webpack.Configuration = {
  mode: "development",
  entry: {
    react: "./src/react/index.tsx",
    vanilla: "./src/vanilla/scripts/app.ts",
  },
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
  plugins: [
    new HtmlWebpackPlugin({
      title: "Vanilla TypeScript Webpack App",
      xhtml: true,
      template: "./src/vanilla/template.html",
      filename: "vanilla.html",
      chunks: ["vanilla", "styles"],
      minify: false,
      inject: true,
    }),
    new HtmlWebpackPlugin({
      title: "React TypeScript Webpack App",
      xhtml: true,
      chunks: ["react"],
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    // static: {
    //   directory: Path.join(__dirname, "public"),
    // },
    client: {
      logging: "warn",
    },
    hot: true,
    compress: false,
    port: 8080,
    // watchFiles: ["src/vanilla/template.html", "src/**/*.ts", "src/**/*.scss"],
    static: ["src/vanilla/**/*.html"],
  },
  performance: {
    hints: false,
  },
}

const prodConfig: Webpack.Configuration = {
  mode: "production",
  entry: {
    vanilla: "./src/vanilla/scripts/app.ts",
  },
  output: {
    filename: "[name].[fullhash].js",
    path: Path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: [/node_modules/, Path.resolve(__dirname, "src/react")],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Tasks App",
      xhtml: true,
      template: "./src/vanilla/template.html",
      filename: "index.html",
      chunks: ["vanilla", "styles"],
      minify: false,
      inject: true,
    }),
  ],
}

// export default isDev
//   ? merge(commonConfig, devConfig)
//   : merge(commonConfig, prodConfig)

// console.log("isDev?", isDev, console.log(process.env.NODE_ENV))

type CLIValues = boolean | string

type EnvValues = Record<string, CLIValues | Record<string, Env>>

interface Env extends EnvValues {}

type Argv = Record<string, CLIValues>

export interface WebpackConfigurationGenerator {
  (env?: Env, argv?: Argv):
    | Webpack.Configuration
    | Promise<Webpack.Configuration>
}

export default (_?: Env, argv?: Argv): Webpack.Configuration => {
  console.log("mode?", argv?.mode)
  // throw new Error(String(argv?.mode))

  return merge(
    commonConfig,
    argv?.mode === "production" ? prodConfig : devConfig
  )
}
