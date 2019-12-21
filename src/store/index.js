import axios from "axios";
// actionType
const GET_LIST = "INDEX/GET_LIST"
// actionCreator
const changeList = list=>({
	type:GET_LIST,
	list
})

export const getIndexList = server=>{
	// console.log('getIndexList---===');
	return (dispatch,getState,axiosInstance)=>{
		// console.log('getIndexList---===return1');
		return axiosInstance.get('/api/course/list').then(res=>{
			// console.log('getIndexList---===return2');
			const {list} = res.data
			// console.log('list',list);
			dispatch(changeList(list))
		})
	}
}

const defaultState={
	list:[]
}

export default (state=defaultState,action) =>{
	// console.log('index-action-type---',action.type);
	// console.log('index-GET_LIST---===',GET_LIST);
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
