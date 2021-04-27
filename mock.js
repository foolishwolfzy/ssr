const express = require('express')
const app = express()
app.get('/api/user/info',(req,res) =>{
	// 支持跨域
	// res.header('Access-Control-Allow-Origin', '*')
	// res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
	// res.header('Content-Type', 'application/json;charset=utf-8')
	res.json({
		code:0,
		data:{
			title:'呵呵',
			best:'啊啊'
		}
	})
})

app.get('/api/course/list',(req,res) =>{
	// 支持跨域
	// res.header('Access-Control-Allow-Origin', '*')
	// res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
	// res.header('Content-Type', 'application/json;charset=utf-8')
	res.json({
		code:0,
		list:[
			{name:'nike',id:1},
			{name:'adidas',id:2},
			{name:'山本耀司',id:3},
			{name:'李宁',id:4},
			{name:'安踏',id:5}
		]
	})
})
app.listen(9090,()=>{
	console.log('mock-start!')
})