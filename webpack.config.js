const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[chunkhash].bundle.js"
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     // 将css用link的方式引入就不再需要style-loader了
      //     use: ['css-loader']
      //   })
      // },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[hash].[name].[ext]',
          publicPath: '/dist/'
        }
      }
    ]
  },
  plugins: [
    // 打包前先清空dist文件
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      // 选择一个html文件作为模板
      template: './index.html',
      // 在打包好的bundle.js后面添加hash
      hash: true
    }),
    // 拆分后会把css文件放到dist目录下的css/style.css
    new ExtractTextPlugin('css/style.css')
  ]
}