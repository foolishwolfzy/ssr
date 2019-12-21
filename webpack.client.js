const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	mode:"development",
	//客户端入口
	entry:"./client/index.js",
	// 客户端输出
	output:{
		filename:'bundle.js',
		path:path.resolve(__dirname, 'public'),
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.csr.html',
			template:'src/index.csr.html',
			inject:true
		})
	],
	//可以用webpakc merger来做前后端的合并
	module:{
		rules:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude: /node_modules/,
				options:{
					presets:['@babel/preset-react',['@babel/preset-env']]
				}
			},
			{
				test:/\.css$/,
				use:['style-loader',{
					loader:'css-loader',
					options:{
						modules:true
					}
				}],
			}
		]
	}
}