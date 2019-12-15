import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { StaticRouter,matchPath } from "react-router-dom";
import routes from "../src/App";
import { Provider } from "react-redux";
import store from '../src/store/store.js'

const app = express();
app.use(express.static('public'))
	app.get('*', (req, res) => {
	// 获取根据路由渲染出的组件，并且拿到loadData方法，获取数据
	// 存储网络请求
	const promises = [];
	routes.some(route => {
		const match = matchPath(req.path, route);
		if (match) {
			const {loadData} = route.component
			if(loadData){
				promises.push(loadData(store));
			}
		}
		return match;
	});
	// 等待所有网络请求结束再渲染
	Promise.all(promises).then(data => {
	  // do something w/ the data so the client
		// can access it then render the app
		const content = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url}>
					{App}
				</StaticRouter>
			</Provider>
		)
		// 字符串模板
		res.send(`
		<html>
			<head>
				<meta charset="utf-8"/>
				<title>react ssr</title>
			</head>
			<body>
				<div id="root">${content}</div>
				<script src="/bundle.js"></script>
			</body>
		</html>
		`)
	});
})
app.listen(9088,()=>{
	console.log('开始监听')
})