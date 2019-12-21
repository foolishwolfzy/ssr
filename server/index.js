import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { StaticRouter,matchPath, Route,Switch } from "react-router-dom";
import routes from "../src/App";
import path from "path";
import fs from "fs";
import { Provider } from "react-redux";
import {getServerStore} from '../src/store/store.js'
import Header from "../src/component/Header.js";
const proxy = require('express-http-proxy')
// console.log('proxy---===',proxy);
const app = express();
const store = getServerStore()
// console.log('store----',store)
//来自客户端以/api开头的请求的请求代理转发
app.use('/api', proxy('http://localhost:9090', {
  proxyReqPathResolver: (req) => {
		console.log('proxy---',req.url);
    return '/api' + req.url
  }
}))
function csrRender(res){
	//读取csr文件返回
	const filename = path.resolve(process.cwd(),'public/index.csr.html')
	const html = fs.readFileSync(filename,'utf-8')
	return res.send(html)
}
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
// 把public设置为静态资源目录，这样才能读到客户端的js
app.use(express.static('public'))
app.get('*', (req, res) => {
	// console.log('res.query---',req.query)
	if(req.query._mode=='csr'){
		console.log('url参数开启csr降级')
		return csrRender(res)
	}
	// 获取根据路由渲染出的组件，并且拿到loadData方法，获取数据
	// 存储网络请求
	const promises = [];
	routes.some(route => {
	// routes.filter(route => {
			// console.log('route',route);
		const match = matchPath(req.path,route);
		// console.log('match---',match);
		if (match) {
			const {loadData} = route.component
			// console.log('loadData---',loadData);
			if(loadData){
				promises.push(loadData(store));
			}
		}
		// return match;
	})
	// 等待所有网络请求结束再渲染
	Promise.all(interceptPromises(promises)).then(data => {
			// console.log('data---======',data);
		const context = {
			css:[]
		}
		const content = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
				<Header></Header>
				<Switch>
				{routes.map(route=><Route {...route}></Route>)}
				</Switch>
				</StaticRouter>
			</Provider>
		)
		console.log('context--',context)
		if(context.statuscode){
			// 状态的切换和页面跳转
			res.status(context.statuscode)
		}
		if(context.action=="REPLACE"){
			console.log('context.url---')
			res.redirect(301,context.url)
		}
		const css = context.css.join('\n')
		// 字符串模板
		res.send(`
		<html>
			<head>
				<meta charset="utf-8"/>
				<style>
				${css}
				</style>
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