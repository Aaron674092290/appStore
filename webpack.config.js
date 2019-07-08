const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path=require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
  }
module.exports={
    devtool: 'eval-source-map',
    entry:['@babel/polyfill',__dirname+'/src/main.js'],//唯一入口    
    output:{
        path:__dirname+'/build',//打包后的文件路径
        filename:'bundle-[hash].js'//打包后输出的文件名
    },
    devServer:{
        contentBase:"./public", //本地服务器所加载的页面所在的目录
        historyApiFallback:true,//不跳转
        port:'8088',
        compress:true,
        inline:true, //实时刷新
        // proxy:{
        //     "/api":{
        //         target:'',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             "^/api":""
        //         } 
        //     }
        // }
    },
    resolve:{
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
        alias:{
            '@': resolve('./src')
        }
    },
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/,
                use:{
                    loader:'babel-loader',
                },
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },{
                        loader:'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },{
                        loader:'postcss-loader'
                    }
                ]
            },{
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ]
            }, {
                test: /\.(png|jpg|jpeg|gif|bmp|svg)$/,
                use: [
                    // 计算机中存储的单位：Bit，Byte，KB，MB，GB，TB
                    // 这里limit选项需要配置的单位是字节(byte)，一般配置8到10KB
                    {
                        loader: 'url-loader',
                        options: {limit: 8192, name: '[name]_[hash:8].[ext]'} // 小于8kb的文件转为base64, 文件名称使用6位hash
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('created by Aaron'),
        new HtmlWebpackPlugin({
            template:__dirname+"/src/index.tmpl.html", //new一个这个插件的实例，并传入相关的参数
            minify:{ // 压缩优化HTML页面
                collapseWhitespace:true,      // 合并空白字符
                removeComments:true,         // 移除注释
                removeAttributeQuotes:true // 移除属性上的引号
            }
        })
    ]
}