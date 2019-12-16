import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { StaticRouter,matchPath, Route } from "react-router-dom";
import routes from "../src/App";
import { Provider } from "react-redux";
import {getServerStore} from '../src/store/store.js'
import Header from "../src/component/Header.js";
const proxy = require('express-http-proxy')
// console.log('proxy---===',proxy);
const app = express();
const store = getServerStore()
// console.log('store----',store)
//代理转发
app.use('/api', proxy('http://localhost:9090', {
  proxyReqPathResolver: (req) => {
		console.log('proxy---',req.url);
    return '/api' + req.url
  }
}))
app.use(express.static('public'))
	app.get('*', (req, res) => {
	// 获取根据路由渲染出的组件，并且拿到loadData方法，获取数据
	// 存储网络请求
	const promises = [];
	// routes.some(route => {
		routes.filter(route => {
		const match = matchPath(req.path, route);
		if (match) {
			const {loadData} = route.component
			if(loadData){
				promises.push(loadData(store));
			}
		}
		return match;
	});
	//捕捉接口错误
	const interceptPromises = (promises)=> {
		return promises.map(promise =>
			promise.then(res => {
				// console.log('hp=then---res',res)
				return { code: 0, data: res }
			})
			.catch(err => {
				// console.log('hp=catch---err',err)
				return { code: 500, data: err }
			})
		)
	}
	// 等待所有网络请求结束再渲染
	Promise.all(interceptPromises(promises)).then(data => {
			// console.log('data---======',data);
		const content = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url}>
				<Header></Header>
					{routes.map(route=><Route {...route}></Route>)}
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
				<script>window.__context=${JSON.stringify(store.getState())}</script>
				<script src="/bundle.js"></script>
			</body>
		</html>
		`)
	}).catch(()=>{
		res.send('报错页面500！')
	});
})

app.listen(9088,()=>{
	console.log('开始监听')
})