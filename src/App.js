import React,{useState} from "react";
import { Route } from "react-router-dom";
import Index from "./container/index.js";
import About from "./container/about.js";
import User from "./container/user.js";

// export default (
// 	<div>
// 		<Route path="/" exact component={Index}></Route>
// 		<Route path="/about" exact component={About}></Route>
// 	</div>
// )

export default [
	{
		path:'/',
		component:Index,
		// loadData:index,
		// exact:true,
		key:'index'
	},
	{
		path:'/about',
		component:About,
		// loadData:about,
		exact:true,
		key:'about'
	},
	{
		path:'/user',
		component:User,
		// loadData:user,
		exact:true,
		key:'user'
	}
]