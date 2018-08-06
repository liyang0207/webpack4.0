const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {//配置此静态文件服务器，可以用来预览打包后项目
    inline:true,//打包后加入一个websocket客户端
    contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
    host: 'localhost',//主机地址
    port: 4200,//端口号
    compress: true,//开发服务器是否启动gzip等压缩
    open:true, // 自动打开浏览器
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[chunkhash].bundle.js",
    publicPath: "/"
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
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(html|htm)$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: '/src/',           //只转义src目录下的js文件
        exclude: '/node_modules/'   //排除掉node_modules目录
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
    new ExtractTextPlugin('static/css/style.css')
  ]
}
