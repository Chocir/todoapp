'use client';
import { Task } from '../types'
import React, { use, useRef } from 'react'
import { useState } from 'react'
import { editTodo, deleteTodo} from '../api'
import { useEffect } from 'react'

interface TodoProps {
    todo: Task;
}


const Todo = ({todo} : TodoProps) => {
    const ref = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

    useEffect(() => {
        if (isEditing) {
            ref.current?.focus();
        }
    }, [isEditing]);   

    const handleEdit = async () => {
        setIsEditing(true);
    }

    const handleSave = async () => {
        await editTodo(todo.id,editedTaskTitle);
        setIsEditing(false);
    }

    const handleDelete = async () => {
        await deleteTodo(todo.id);
    }

  return (
    <li 
    key={todo.id}
    className='flex justify-between p-4  bg-white border-l-4 border-blue-50 rounded shadow'
    >
    {isEditing ?
    <input 
    ref={ref}
    type='text' 
    className='mr-2 rounded border-gray-400 border text-3xl'
    value={editedTaskTitle}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTitle(e.target.value)}
    /> : <span className='text-3xl'>{todo.text}</span>}
    <div className='flex justify-between p-1'>
        {isEditing ? (
            <button className='text-blue-500 mr-3 p-2' onClick={handleSave}>
            save
            </button>
        ) : (
            <button className='text-white border mr-3 p-2 rounded bg-lime-300' onClick={handleEdit}>
            edit
            </button>
        )}

      <button className='text-white border mr-3 p-2 rounded bg-red-300' onClick={handleDelete}>Delete</button>
    </div>
  </li>
  )
}

export default Todo