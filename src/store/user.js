import axios from "axios";
// actionType
const GET_LIST = "INDEX/USER_INFO"
// actionCreator
const changeUserInfo = data=>({
	type:GET_LIST,
	data
})

export const getUserInfo = server=>{
	// console.log('getUserInfo---===')
	return (dispatch,getState,axiosInstance)=>{
		// console.log('getUserInfo---===return1')
		return axios.get('/api/user/info').then(res=>{
			// console.log('getUserInfo---===return2')
			// return axios.get('http://localhost:9090/api/user/info').then(res=>{
			const {data} = res.data
			console.log('user-info',data);
			dispatch(changeUserInfo(data))
		})
	}
}

const defaultState={
	userinfo:{}
}

export default (state=defaultState,action) =>{
	console.log('user-action---',action.type);
	console.log('GET_LIST---===',GET_LIST);
	switch(action.type){
		case GET_LIST:
			const newState={
				...state,
				userinfo:action.data
			}
			return newState
		default:
			return state
	}
}
