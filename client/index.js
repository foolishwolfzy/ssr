import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import routes from "../src/App";
import { Provider } from "react-redux";
import {getClientStore} from '../src/store/store.js'
import Header from "../src/component/Header.js";

// 注水 客户端入口
const Page = (<Provider store={getClientStore()}>
	<BrowserRouter>
	<Header></Header>
	{routes.map(route=><Route {...route}></Route>)}
	</BrowserRouter>
</Provider>)
ReactDom.hydrate(Page,document.getElementById('root'))