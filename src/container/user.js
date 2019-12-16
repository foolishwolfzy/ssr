import React from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../store/user.js";
function User(props){
	return <div>
		<h1>
			你好坏{props.userinfo.title},你们最坏的人是{props.userinfo.best}
		</h1>
	</div>
}
User.loadData = (store)=>{
	return store.dispatch(getUserInfo())
}
export default connect(
	// state=>{
	// 	console.log('state---',state)
	// }
	state=>{
		// console.log('state--',state)
		return{
			// userinfo:state.userinfo
			userinfo:state.user.userinfo
		}
	},
	// {getUserInfo}
)(User)
