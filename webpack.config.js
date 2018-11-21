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
    publicPath: isDev ? '/' : 'https://cdn.example.com/assets/'
  },
  mode: node_env,
  devtool: isDev ? 'source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.css', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': path.resolve(__dirname, 'src')
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor:{
          chunks:"all",
          test: /[\\/]node_modules[\\/]/,
          name:"vendor",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority:100,
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
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: [{
        loader: 'url-loader', options: {
          limit: 8192
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
  ],
};

if (isDev) {
  // development
  config.devServer = {
    contentBase: path.resolve('src/app'),
    inline: true,
    hot: true,
    port: 3001,
    overlay: true,
    stats: "errors-only",
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
    // new StyleLintPlugin({
    //   files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    // })
  );
} else {
  // production
  config.plugins.push(
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css',
    })
  );
}
module.exports = config;
