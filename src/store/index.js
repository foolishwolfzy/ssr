import axios from "axios";
// actionType
const GET_LIST = "INDEX/GET_LIST"
// actionCreator
const changeList = list=>({
	type:GET_LIST,
	list
})

export const getIndexList = server=>{
	console.log('getIndexList---===');
	return (dispatch,getState,axiosInstance)=>{
		return axios.get('/api/course/list').then(res=>{
			const {list} = res.data
			console.log('list',list);
			dispatch(changeList(list))
		})
	}
}

const defaultState={
	list:[]
}

export default (state=defaultState,action) =>{
	switch(action.type){
		case GET_LIST:
			const newState={
				...state,
				list:action.list
			}
			return newState
		default:
			return state
	}
}
