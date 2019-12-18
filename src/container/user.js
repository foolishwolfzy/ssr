import React, {useEffect}from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../store/user.js";

const isEmptyObject = function (obj) {
	return JSON.stringify(obj) === '{}';
}
function User(props){
	// console.log('user-props---', props);
	useEffect(()=>{
		// 异步数据首页显示
		if(isEmptyObject(props.userinfo)){
			// 当不是首次或刷新进来，无数据，通过客户端获取
			console.log('props.getUserInfo-----')
			props.getUserInfo()
		}
		
	},[])
	return <div>
		<h1>
			你好坏{props.userinfo.title},你们最坏的人是{props.userinfo.best}
		</h1>
	</div>
}
User.loadData = (store)=>{
	// console.log('user-loadData---', store.dispatch(getUserInfo()))
	// console.log('user-loadData---')
	// console.log('getUserInfo---',getUserInfo());
	return store.dispatch(getUserInfo())
}
export default connect(
	state=>{
		// console.log('state--',state)
		return{
			userinfo:state.user.userinfo
		}
	},
	{getUserInfo}
)(User)
