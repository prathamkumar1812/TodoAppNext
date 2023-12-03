'use client';
import React, { use, useEffect } from 'react'
import Link from 'next/link';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, onSearch, onFilter, onEdit, onClick, onCompleted, onAdd } from '../Redux/features/todo/todoSlice';


function Todos() {
  const add = useSelector((state) => state.add);
  const [isfilter, setIsfilter] = useState(false);
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])



  const SearchItem = useSelector((state) => state.searchItem);
  const filterItem = useSelector((state) => state.filtertodo);
  const CompletedItem = useSelector((state) => state.completed)

  let searchtodos = todos.filter((todo) => todo.title.includes(SearchItem));
  if (isfilter) {
    if (filterItem != 'All') {
      searchtodos = searchtodos.filter((todo) => todo.Priority === filterItem);
    }
    if (CompletedItem != "All") {
      searchtodos = searchtodos.filter((todo) => todo.completed === CompletedItem);
    }
  }
  const changes = (e, todo) => {
    dispatch(onEdit(todo));
    dispatch(onClick(false));
    dispatch(onAdd(true));

  }

  const dispatch = useDispatch();
  return (
    <div className={`${add ? "hidden" : ""} md:inline-block w-full md:w-1/3 h-screen bg-[#9BBEC8] border-gray-500 border-r-2  scroll-m-10 `}>
      <h1 className='text-3xl text-center h-1/8 bg-[#164863] sm:text-4xl'>Todos</h1>
      <div className='p-2'>
        <div className='w-full mt-4 '>  <input text='text' className='w-full h-10 border border-black/10 rounded-lg px-3 outline-none duration-150  bg-[#DDF2FD]' placeholder='Search' value={SearchItem} onChange={(e) => dispatch(onSearch(e.target.value))} /></div>
        {/* filter the todos */}

        <div className='flex justify-between items-center h-1/8 px-2 mt-4'>
          <input type="checkbox" onChange={() => setIsfilter(prev => !prev)} />
          <span className='text-xl'>Filter</span>
          <select className='px-2 py-1 rounded-md' value={filterItem} onChange={(e) => dispatch(onFilter(e.target.value))}>
            <option value='All'>All</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
          <select className='px-2 py-1 rounded-md' value={CompletedItem} onChange={(e) => dispatch(onCompleted(e.target.value))}>
            <option value='All'>All</option>
            <option value='In'>In progress</option>
            <option value='Done'>Done</option>
            <option value='Not'>Not yet Done</option>
          </select>
        </div>




        {/* show todos */}
        <ul className=' mt-4 list-none'>
          {searchtodos.map((todo) => (
            <div className='flex justify-between items-center h-1/8 border-b-2 border-gray-500 mt-4 bg-[#427D9D] rounded-md p-3 '>
              <li key={todo.id} className=' w-full cursor-pointer' onClick={(e) => changes(e, todo)}

              >
                <span className='text-xl'>{todo.title}</span>

              </li>
              <div className='flex space-x-2'>
                <button className='bg-[#164863] text-white px-2 py-1 rounded-md' onClick={() => dispatch(removeTodo(
                  todo.id
                ))}>Delete</button>
              </div>
            </div>
          ))}

        </ul>
        <div className='flex justify-center fixed bottom-3 w-full md:hidden '>
          <button className='  md:hidden w-20 h-20 rounded-full cursor-pointer bg-[#164863]' onClick={() => dispatch(onAdd(true))}>Add</button>
        </div>
      </div>

    </div>
  )
}

export default Todos