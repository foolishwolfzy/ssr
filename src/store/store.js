// 存储入口
import { createStore,applyMiddleware,combineReducers } from "redux";
import thunk from "redux-thunk";
import indexReducer from "./index";
import userReducer from "./user";
import axios from "axios";


const reducer = combineReducers({
	index:indexReducer,
	user:userReducer
})

// 服务端的代理转发
const serverAxios = axios.create({
  baseURL: 'http://localhost:9090'
  // baseURL: 'http://localhost:9088'
})

const clientAxios = axios.create({
  // 当前路径的 node 服务
  baseURL: '/'
})

// 创建store
// const store = createStore(reducer,applyMiddleware(thunk))

// export default store
// 服务端store
export const getServerStore = ()=>{
	// 通过server的dispatch来获取
	console.log('getServerStore--==')
	// return createStore(reducer,applyMiddleware(thunk))
	return createStore(reducer,applyMiddleware(thunk.withExtraArgument(serverAxios)))
}
// 客户端store
export const getClientStore = ()=>{
	// 通过window.__context来获取数据
	console.log('getClientStore--==')
	const defaultState = window.__context?window.__context:{}
	// return createStore(reducer,defaultState,applyMiddleware(thunk))
	return createStore(reducer,defaultState,applyMiddleware(thunk.withExtraArgument(clientAxios)))
}