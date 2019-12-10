import React,{useState} from "react";
function App(props){
	// const 和 let的注意区别
	// let [count,setCount] = useState(1)
	// const [count,setCount] = useState(1)
	return <div>
		<h1>啊哈哈！{props.title}</h1>
		<p>{count}</p>
		{/* <button onClick={()=>setCount(count++)}>+</button> */}
		<button onClick={()=>setCount(count+1)}>+</button>
	</div>
}
// export default App
export default <App title="做作业"></App>