import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index.js";
import styles from "./index.css"
import withStyle from "../withStyle";
// console.log(styles._getCss())
function Index(props){
	// if(props.staticContext){
	// 	props.staticContext.css.push(styles._getCss())
	// }
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
	return <div className={styles.container}>
		<h1 className={styles.title}>啊哈哈！{props.title}</h1>
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
// let NewIndex = connect(
// 	state=>({list:state.index.list}),
// 	{getIndexList}
// )(withStyle(Index,styles))

// NewIndex.loadData = (store)=>{
// 	return store.dispatch(getIndexList())
// }

// export default NewIndex
Index.loadData = (store)=>{
	return store.dispatch(getIndexList())
}
export default connect(
	state=>({list:state.index.list}),
	{getIndexList}
)(withStyle(Index,styles))
