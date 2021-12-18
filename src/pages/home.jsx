import React from 'react'
import {useState,useRef,useEffect} from 'react'

function Home() {
    const [isHide,setIsHide]=useState(false);
    const [pre,setPre]= useState([]);
    const [doing,setDo] = useState([]);
    const [done,setDone] = useState([]);
    const [tranSport,setTran]= useState({})
    const [targetState,setTarget]= useState('')
    const input=useRef();
    const change=()=>{
        let a = input.current.value;
    }
    const show=()=>{
        setIsHide(true)
    }
    const save=(e)=>{
        if(e.keyCode === 13 && input.current.value){
            setPre([...pre,{
                id:Date.now(),
                content:input.current.value
            }])
            setIsHide(false)
        }
    }
    const saveBlur=()=>{
        if(input.current.value){
            setPre([...pre,{
                id:Date.now(),
                content:input.current.value
            }])
            setIsHide(false)
        }
    }
    const dragStart=(a,b)=>{
        setTran({
            id:a,
            content:b
        })
    }
    const dragOver=(e)=>{
        e.preventDefault();
        e.target.style.borderWidth="3px";
        setTarget(e.target.className);
    }
    const move=(e)=>{
    }
    const dragLeave=(e)=>{
        e.preventDefault();
        if(targetState==='doing'||targetState==='complete'||targetState==='prepare'){
        e.target.style.borderWidth="0px";}
    }
     const  drop = (e)=>  {
        e.target.style.border="";
        if(targetState==='doing'||targetState==='complete'||targetState==='prepare'){
        setDo(doing.filter((item) => item.id !== tranSport.id));
        setPre(pre.filter((item) => item.id !== tranSport.id));
        setDone(done.filter((item) => item.id !== tranSport.id));
     }
    }
    const del =(id)=>{
         setDo(doing.filter((item) => item.id !== id));
        setPre(pre.filter((item) => item.id !== id));
        setDone(done.filter((item) => item.id !== id));
    }
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
                {
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
                
                {
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
                {
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
