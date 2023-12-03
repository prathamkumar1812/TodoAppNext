'use client';
import { createSlice ,nanoid} from "@reduxjs/toolkit";

const fetch=()=>{
    const todos=JSON.parse(window.localStorage.getItem("todos"));
    if(todos && todos.length>0){
       return todos
    }
    return []
}
const initialState = {
    
    todos:fetch(),
    searchItem: "",
    filtertodo: "All",
    completed:"All",
    todo:{},
    isClick: true,
    add: false,
};
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action)=>{
            const todo={
                id: nanoid(),
                title: action.payload.title,
                describtion: action.payload.describtion,
                Priority: action.payload.Priority,
                completed:action.payload.completed
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload);
        },
        updateTodo: (state, action)=>{
            const index = state.todos.findIndex((todo)=>todo.id === action.payload.id);
            state.todos[index] = action.payload;
        },
        onSearch: (state, action)=>{
            state.searchItem = action.payload;
        },
        onFilter: (state, action)=>{
            state.filtertodo = action.payload;
        },
        onEdit: (state, action)=>{
            state.todo = action.payload;
        },
        onClick: (state, action)=>{
            state.isClick = action.payload;
        },
        onCompleted:(state,action)=>{
            state.completed=action.payload;
        },
        onAdd: (state, action)=>{
            state.add = action.payload;
        },

       
    }
});
export const { addTodo ,removeTodo ,updateTodo,onSearch ,onFilter,onEdit,onClick,onCompleted,onAdd } = todoSlice.actions;
export default todoSlice.reducer;
   

