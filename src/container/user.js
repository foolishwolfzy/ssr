import React from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../store/user.js";
function User(props){
	// console.log('user-props---', props);
	return <div>
		<h1>
			你好坏{props.userinfo.title},你们最坏的人是{props.userinfo.best}
		</h1>
	</div>
}
User.loadData = (store)=>{
	// console.log('user-loadData---', store.dispatch(getUserInfo()))
	// console.log('user-loadData---')
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
