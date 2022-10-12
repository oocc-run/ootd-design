const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  entry: path.resolve(__dirname, "../site/index.tsx"),
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[contenthash:8].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx|ts|js$/,
        exclude: /(node_modules|\.png|svg|jpe?g$)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: isDevelopment
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 3,
              modules: false,
              sourceMap: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.(scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.md$/,
        exclude: /\.(tsx|ts)$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: require.resolve("@dekopon/cli"),
            options: {
              demoDir: "__demo__",
              babelConfig: {
                filename: "",
                presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                plugins: [
                  '@babel/plugin-proposal-export-default-from',
                  // '@babel/plugin-transform-runtime',
                  // '@babel/plugin-syntax-dynamic-import',
                  // '@babel/plugin-proposal-class-properties',
                  // '@babel/plugin-transform-react-jsx-source',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
      path: `./.env.${process.env.NODE_ENV}`,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../site/public/index.html"),
      favicon: path.resolve(__dirname,'../site/public/favicon.ico')
    }),
  ].filter(Boolean),
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ],
    extensions: [".tsx", ".ts", ".js"],
  },
};
