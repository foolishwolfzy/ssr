import React from "react";
import {Route} from "react-router-dom";

function Status({code,children}){
	return <Route render={({staticContext})=>{
		if(staticContext){
			staticContext.statuscode = code
		}
		return children
	}}></Route>
}

function Notfound(props){
	// console.log('notfound---',props);
	// 通过staticContext，设置statusCode
	return<Status code={404}>
		<h1>二师兄吃饭了</h1>
		<img id="img-404" src="/404.jpg" alt=""/>
		</Status>
}

export default Notfound;