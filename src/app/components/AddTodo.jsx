'use client';
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addTodo, onAdd } from '../Redux/features/todo/todoSlice'

function AddTodo() {
    const add = useSelector((state) => state.add);
    const [title, setTitle] = useState('');
    const [status, setstatus] = useState('Not');
    const [Priority, setPriority] = useState('low');

    const dispatch = useDispatch();
    const [describtion, setDescribtion] = useState('');
    const addTodoHandler = (e) => {
        e.preventDefault();
        if (title.length > 0) {
            dispatch(addTodo({
                title: title,
                describtion: describtion,
                completed: status,
                Priority: Priority
            }))
        }

        setDescribtion('');
        setTitle('');
        dispatch(onAdd(false))
    }
    return (
        <div id='home' className={` ${add ? " inline-block" : "hidden"} md:inline-block w-full md:w-[80%] h-screen  bg-[#9BBEC8] `}>
            <h1 className=' h-10 bg-[#164863] text-3xl text-center'>AddTodo</h1>
            <form onSubmit={addTodoHandler} className=" flex flex-col border-black border-2 rounded-xl h-[90%]  w-3/2  m-5  overflow-hidden" >
                <div className='flex md:flex-row flex-col  justify-between mt-20 m-10 '>
                    <input type="text" className='w-full text-2xl md:w-1/2 h-10 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-[#DDF2FD]' name="title" placeholder="Title"
                        value={title} onChange={(e) => setTitle(e.target.value)} />

                    <div className=' flex gap-3 justify-center items-center mt-3 '>
                        <label for="Priority">Priority:</label>
                        <select id="Priority" name="Priority" className=' rounded' value={Priority}
                            onChange={(e) => setPriority(e.target.value)}>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>

                        <label for="Status">Status:</label>
                        <select id="Status" name="Status" className=' rounded' value={status}
                            onChange={(e) => setstatus(e.target.value)}>
                            <option value="In">In progress</option>
                            <option value="Done">Done</option>
                            <option value="Not">Not yet Done</option>
                        </select>
                    </div>

                </div>

                <textarea className='border border-black/10 rounded-l-lg p-4 outline-none duration-150 resize-none m-10 ml-10 h-full rounded  bg-[#DDF2FD]' type="text" name="describtion" placeholder="Todo"
                    value={describtion} onChange={(e) => setDescribtion(e.target.value)} />
                <div className=' h-[20%]w-full text-center'>
                    <button className="w-auto  pl-3 pr-3 rounded text-3xl bg-[#164863]" type="submit">Add</button>
                </div>
            </form>



        </div>
    )
}

export default AddTodo