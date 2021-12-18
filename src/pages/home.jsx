import React from 'react'
import {useState,useRef,useEffect} from 'react'

function Home() {
    const [isHide,setIsHide]=useState(false);
    const [pre,setPre]= useState([]);//准备区事项
    const [doing,setDo] = useState([]);//进行区事项
    const [done,setDone] = useState([]);//完成区事项
    const [tranSport,setTran]= useState({})//拖拽时保存信息
    const [targetState,setTarget]= useState('')//拖拽时目标元素
    const input=useRef();//输入框
    const change=()=>{
        let a = input.current.value;
    }
    //控制input显示
    const show=()=>{
        setIsHide(true)
    }
    //input 触发回车键时保存
    const save=(e)=>{
        if(e.keyCode === 13 && input.current.value){
            setPre([...pre,{
                id:Date.now(),
                content:input.current.value
            }])
            setIsHide(false)
        }
    }
    //input失焦时触发保存
    const saveBlur=()=>{
        if(input.current.value){
            setPre([...pre,{
                id:Date.now(),
                content:input.current.value
            }])
            setIsHide(false)
        }
    }
    //拖拽开始时纪录拖拽元素的数据
    const dragStart=(a,b)=>{
        setTran({
            id:a,
            content:b
        })
    }
    //拖拽移动离开相应区域添加border
    const dragOver=(e)=>{
        e.preventDefault();
        e.target.style.borderWidth="3px";
        setTarget(e.target.className);
    }
    const move=(e)=>{
    }
    //拖拽移动离开相应区域取消border
    const dragLeave=(e)=>{
        e.preventDefault();
        if(targetState==='doing'||targetState==='complete'||targetState==='prepare'){
        e.target.style.borderWidth="0px";}
    }
    //拖拽放开触发 判断移动目标
     const  drop = (e)=>  {
        e.target.style.border="";
        if(targetState==='doing'||targetState==='complete'||targetState==='prepare'){
        setDo(doing.filter((item) => item.id !== tranSport.id));
        setPre(pre.filter((item) => item.id !== tranSport.id));
        setDone(done.filter((item) => item.id !== tranSport.id));
     }
    }
    //根据索引id删除数据
    const del =(id)=>{
         setDo(doing.filter((item) => item.id !== id));
        setPre(pre.filter((item) => item.id !== id));
        setDone(done.filter((item) => item.id !== id));
    }
    //监听三个区域变化更新数据
    useEffect(() => {
      if(targetState==='prepare'){
        setPre([...pre,tranSport])
        setTarget('')}
      if(targetState==='complete'){
        setDone([...done,tranSport])
        setTarget('')}
      if(targetState==='doing'){
        setDo([...doing,tranSport])
        setTarget('')}
    }, [doing,done,pre])
    return (
        <div className="todoList">
            <div className='list'>
            <div className='title-pre'>Prepare to study</div>
            <div className='prepare' onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
                {//遍历准备区数据输出dom
                pre.map((item)=>{
                    return (
                    <p className="event" key={item.id} 
                    onDragStart={()=>dragStart(item.id,item.content)} 
                    onMouseDown={move}
                    onDragEnd={drop} draggable="true" >{item.content}<span className="del" onClick={()=>del(item.id)}>X</span></p>
                    )
                })
                }
                {isHide?
                (<input ref={input} type="text" onChange={change} onKeyUp={save} onBlur={saveBlur}/>):null
                }
                
                <div className="addButton"><span className='add' onClick={show}>+</span></div>
                
            </div>
            </div>
            <div className='list'>
            <div className='title-do'>Learning...</div>
            <div className='doing' onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
                
                {//遍历进行区数据输出dom
                doing.map((item)=>{
                    return (
                    <p className="event" key={item.id} 
                    onDragStart={()=>dragStart(item.id,item.content)} 
                    onDragEnd={drop} draggable="true" >{item.content}<span className="del" onClick={()=>del(item.id)}>X</span></p>
                    )
                })
                }
            </div>
            </div>
            <div className='list'>
            <div className='title-done'>complete</div>
            <div className='complete' onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
                {//遍历完成区数据输出dom
                done.map((item)=>{
                    return (
                    <p className="event" key={item.id} 
                    onDragStart={()=>dragStart(item.id,item.content)} 
                    onDragEnd={drop} draggable="true" >{item.content}<span className="del" onClick={()=>del(item.id)}>X</span></p>
                    )
                })
                }
            </div>
            </div>
        </div>
    )
}

export default Home
