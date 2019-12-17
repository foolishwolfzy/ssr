const path = require('path');
module.exports = {
	mode:"development",
	//客户端入口
	entry:"./client/index.js",
	// 客户端输出
	output:{
		filename:'bundle.js',
		path:path.resolve(__dirname, 'public'),
	},
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
			}
		]
	}
}