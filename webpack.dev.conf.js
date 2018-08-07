const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {//配置此静态文件服务器，可以用来预览打包后项目
    inline:true,//打包后加入一个websocket客户端
    contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
    host: 'localhost',//主机地址
    port: 4200,//端口号
    compress: true,//开发服务器是否启动gzip等压缩
    open:true, // 自动打开浏览器
  },
  devtool: 'cheap-module-eval-source-map'
})
