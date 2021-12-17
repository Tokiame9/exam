import React from 'react'
import {useState,useRef} from 'react'

function Home() {
    const [isHide,setIsHide]=useState(false);
    const [pre,setPre]= useState([]);
    const [doing,setDo] = useState([]);
    const [done,setDone] = useState([]);
    const [tranSport,setTran]= useState({})
    const [targetState,setTarget]= useState({})
    const input=useRef();
    const change=()=>{
        let a = input.current.value;
        console.log(a);
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
    const dragStart=(a,b)=>{
        setTran({
            id:a,
            content:b
        })
    }
    const dragOver=(e)=>{
        setTarget(e.target.className)
        console.log(e.current)

    }
    const drop=()=>{
        console.log(targetState)
        if(targetState=='doing'){
            setDo(doing.filter((item) => item.id !== tranSport.id));
            setPre(pre.filter((item) => item.id !== tranSport.id));
            setDone(done.filter((item) => item.id !== tranSport.id));
            setDo([...doing,tranSport])
        }
        else if(targetState=='complete'){
            setDo(doing.filter((item) => item.id !== tranSport.id));
            setPre(pre.filter((item) => item.id !== tranSport.id));
            setDone(done.filter((item) => item.id !== tranSport.id));
            setDone([...done,tranSport])
        }
        else if(targetState=='prepare'){
            setDo(doing.filter((item) => item.id !== tranSport.id));
            setPre(pre.filter((item) => item.id !== tranSport.id));
            setDone(done.filter((item) => item.id !== tranSport.id));
            setPre([...pre,tranSport])
        }
    }
    return (
        <div className="todoList">
            <div className='prepare' onDragOver={dragOver}>
                <div>Prepare to study</div>
                {
                pre.map((item)=>{
                    return (
                    <p className="event" key={item.id} onDragStart={()=>dragStart(item.id,item.content)} onDragEnd={drop} draggable="true">{item.content}</p>
                    )
                })
                }
                {isHide?
                (<input ref={input} type="text" onChange={change} onKeyUp={save} />):null
                }
                
                <span className='add' onClick={show}>+</span>
            </div>
            <div className='doing' onDragOver={dragOver}>
                <div>Learning...</div>
                {
                doing.map((item)=>{
                    return (
                    <p className="event" key={item.id} onDragStart={()=>dragStart(item.id,item.content)} onDragEnd={drop} draggable="true">{item.content}</p>
                    )
                })
                }
            </div>
            <div className='complete' onDragOver={dragOver} >
                <div>complete</div>
                {
                done.map((item)=>{
                    return (
                    <p className="event" key={item.id} onDragStart={()=>dragStart(item.id,item.content)} onDragEnd={drop} draggable="true">{item.content}</p>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Home
