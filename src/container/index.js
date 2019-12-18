import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index.js";
function Index(props){
	// console.log('props----',props);
	// const 和 let的注意区别
	// let [count,setCount] = useState(1)
	const [count,setCount] = useState(1)
	useEffect(()=>{
		// 异步数据首页显示
		if(!props.list.length){
			// 当不是首次或刷新进来，无数据，通过客户端获取
			props.getIndexList()
		}
		
	},[])
	return <div>
		<h1>啊哈哈！{props.title}</h1>
		<p>{count}</p>
		{/* <button onClick={()=>setCount(count++)}>+</button> */}
		<button onClick={()=>setCount(count+1)}>+</button>
		<hr/>
		<ul>
			{
				props.list.map(item=>{
					return <li key={item.id}>{item.name}</li>
				})
			}
		</ul>
	</div>
}

// 服务端loadData
Index.loadData = (store)=>{
	// console.log('index-loadData---', store.dispatch(getIndexList()))
	return store.dispatch(getIndexList())
}
export default connect(
	state=>({list:state.index.list}),
	{getIndexList}
)(Index)
