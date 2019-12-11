import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";
import { Provider } from "react-redux";
import store from '../src/store/store.js'

// 注水 客户端入口
const Page = (<Provider store={store}>
	<BrowserRouter>
	{App}
	</BrowserRouter>
</Provider>)
ReactDom.hydrate(Page,document.getElementById('root'))
// ReactDom.hydrate(App,document.getElementById('root'))