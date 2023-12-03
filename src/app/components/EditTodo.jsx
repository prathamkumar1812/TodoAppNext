'use client';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { updateTodo,onClick, onAdd } from '../Redux/features/todo/todoSlice.js'
import Link from 'next/link';

function EditTodo() {
  const add = useSelector((state) => state.add);
    const todo=useSelector((state)=>state.todo);
    const [title, setTitle] = useState(todo.title);
    const[status, setstatus] = useState('Not');
    const [pirporty, setPirporty] = useState(todo.pirorty);
    useEffect(()=>{
        setstatus(todo.completed);
        setPirporty(todo.pirorty);
        setTitle(todo.title);
        setDescribtion(todo.describtion);
    },[todo])
    const dispatch = useDispatch();
    const [describtion, setDescribtion] = useState(todo.describtion);
    const updateTodoHandler = (e) => {
        e.preventDefault();
        if(title.length>0){
            dispatch(updateTodo({
                id:todo.id,
                title: title,
                describtion: describtion,
                pirorty: pirporty,
                completed:status
            }))
        }
       
        dispatch(onClick(true));
        dispatch(onAdd(false));
        
          
    }
    return (
        <div id='home' className={`  ${add?"inline-block":"hidden"} md:inline-block w-full md:w-[80%] h-screen  bg-[#9BBEC8]`}>
            <h1 className=' h-10 bg-[#164863] text-3xl text-center'>EditTodo</h1>
            <form onSubmit={updateTodoHandler} className=" flex flex-col border-black border-2 rounded-xl h-[90%]  w-3/2  m-5  overflow-hidden" >
                <div className='flex md:flex-row flex-col  justify-between mt-20 m-10  '>
                <input  type="text" className='w-full text-2xl md:w-1/2 h-10 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-[#DDF2FD]' name="title" placeholder="Title"
                    value={title} onChange={(e) => setTitle(e.target.value)} />

                <div className='flex gap-3 justify-center items-center mt-3 '>
                <label for="pirorty">Porirty:</label>
                <select id="pirorty" name="pirorty" className=' rounded' value={pirporty}
                onChange={(e)=>setPirporty(e.target.value)}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
                <label for="Status">Status:</label>
                <select id="Status" name="Status" className=' rounded' value={status}
                onChange={(e)=>setstatus(e.target.value)}>
                    <option value="In">In progress</option>
                    <option value="Done">Done</option>
                    <option value="Not">Not yet Done</option>
                </select>
                </div>
                
                </div>
                
                <textarea  className='border border-black/10 rounded-l-lg p-4 outline-none duration-150 resize-none m-10 ml-10 h-full rounded  bg-[#DDF2FD]' type="text" name="describtion" placeholder="Todo"
                    value={describtion} onChange={(e) => setDescribtion(e.target.value)} />
               <div className=' h-[20%]w-full text-center flex justify-evenly'>
              
            <button className="w-auto  pl-3 pr-3 rounded text-3xl bg-[#164863]" type="submit">Save</button>
            </div>
            </form>
            
            

        </div>
    )
}

export default EditTodo