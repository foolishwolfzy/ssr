const express =require('express');
const puppeteer = require('puppeteer');
// /api开头的
const axios = require('axios');
const app = express();

async function test(){
	console.log('截图---');
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.vip.com/')
	await page.screenshot({path:'vip.png'})
	await browser.close();
}
// test()
const urlCache = {}
app.get('*',async function(req,res){
	console.log(req.url)
	const url = 'http://localhost:9088' + req.url
	// 1.加缓存
	// 2.lru缓存算法
	if(urlCache[url]){
		return res.send(urlCache[url])
	}
	if(req.url=='/favicon.ico'){
		// 对SEO无影响
		return res.send({code:0})
	}
	
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url,{
		waitUntil:['networkidle0']
	})
	const html = await page.content()
	console.log(html);
	// res.send({
	// 	code:1,
	// 	data:html
	// })
	urlCache[url] = html.url
	res.send(html)
})
app.listen(8081,()=>{
	console.log('server start');
})