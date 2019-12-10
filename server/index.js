import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import App from "../src/App";

const app = express();
app.use(express.static('public'))
app.get('/', (req, res) => {
	// const Page = <App title='sdfsdf'></App>
	// 把react组件，解析成html
	const content = renderToString(App)
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
})
app.listen(9088,()=>{
	console.log('开始监听')
})