import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route,Switch  } from "react-router-dom";
import routes from "../src/App";
import { Provider } from "react-redux";
import {getClientStore} from '../src/store/store.js'
import Header from "../src/component/Header.js";

// 注水 客户端入口
const Page = (<Provider store={getClientStore()}>
	<BrowserRouter>
	<Header></Header>
	<Switch>
	{routes.map(route=><Route {...route}></Route>)}
	</Switch> 
	</BrowserRouter>
</Provider>)

if(window.__context){
	// ssr
	ReactDom.hydrate(Page,document.getElementById('root'))
}else{
	// 降级后变成客户端渲染
	ReactDom.render(Page,document.getElementById('root'))
}
