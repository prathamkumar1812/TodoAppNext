'use client';
import React from 'react';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import EditTodo from './components/EditTodo';
import { useSelector } from 'react-redux';

export default function Home() {
  const isclick = useSelector((state) => state.isClick);
  const [add, setAdd] = React.useState(false);
  return (
    <div className=' bg-[#9BBEC8]  md:w-screen h-screen flex  md:flex '>
      <Todos />
      {isclick ? <AddTodo /> : <EditTodo />}
    </div>
  )
}
