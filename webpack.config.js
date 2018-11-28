const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');

const node_env = process.env.NODE_ENV || 'production';
const isDev = node_env === 'development';

const config = {
  entry: {
    index: path.resolve('src/app/index.js'),
  },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.[hash:8].js',
    publicPath: '/'
  },
  mode: node_env,
  devtool: isDev ? 'source-map' : 'eval',
  devServer: {
    contentBase: path.resolve('src/app'),
    inline: true,
    hot: true,
    port: isDev ? 3001 : 3005,
    overlay: true,
    stats: "errors-only",
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.css', '.vue'],
    alias: {
      // 有两个运行环境配置的版本：Compiler版本、Runtime版本。
      // 当对template模板内容编译，需要使用Compiler版本。
      // 如果使用vue-loader加载.vue文件时（组件文件），就需要Runtime版本
      // 从Compiler版本修改为Runtime版本
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name:"vendor",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      oneOf: [
        // 这里匹配 `<style module>`
        {
          resourceQuery: /module/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', options: {
                sourceMap: isDev,
                modules: true,
                localIdentName: '[local]_[hash:base64:8]'
              }
            },
            {
              loader: 'sass-loader', options: {
                sourceMap: isDev
              }
            },
            {
              loader: "postcss-loader", options: {
                plugins: [
                  require("autoprefixer")
                ]
              }
            }
          ]
        },
        // 这里匹配普通的 `<style>` 或 `<style scoped>`
        {
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', options: {
                sourceMap: isDev,
              }
            },
            {
              loader: 'sass-loader', options: {
                sourceMap: isDev
              }
            },
            {
              loader: "postcss-loader", options: {
                plugins: [
                  require("autoprefixer")
                ]
              }
            }
          ]
        }
      ]
    }, {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }, 'eslint-loader'],
      exclude: path.resolve('node_modules'),
    }, {
      test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|ttf|eot)$/,
      use: [{
        loader: 'url-loader', options: {
          limit: 8192,
          publicPath: isDev ? '/images' : '/images',
          outputPath: 'images/'
        }
      }]
    }, {
      test: /\.vue$/,
      use: 'vue-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(node_env)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html?[hash:8]',
      template: path.resolve('src/app/index.html')
    }),
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
};

if (isDev) {
  // development
  // config.plugins.push(
    // new StyleLintPlugin({
    //   files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    // })
  // );
} else {
  // production
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css',
    })
  );
}
module.exports = config;
