import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import useLoginUser from '../hooks/useLoginUser';
import { loadingStates, roles } from '../auth/authUtils';
import {
  addTodoThunkApi,
  deleteTodoThunkApi,
  editTodoThunkApi,
  getTodosThunkApi,
} from '../api/todoApi';
import { addTodo, getAllTodoDataState } from '../app/todoSlicer';
import './components.css';

const VisitWork = () => {
  const [todoInput, setTodoInput] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [shouldFetchTodos, setShouldFetchTodos] = useState(false);

  const dispatch = useDispatch();
  const { loading: todosLoading, data: todos } = useSelector(getAllTodoDataState);
  const { name, email, role } = useLoginUser();

  useEffect(() => {
    if (todosLoading === loadingStates.IDLE || shouldFetchTodos) {
      dispatch(getTodosThunkApi()).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setShouldFetchTodos(false);
        }
      });
    }
  }, [shouldFetchTodos, dispatch]);

  const handleAddTodo = async () => {
    if (!todoInput.trim()) return;

    const newTodo = { role, email, description: todoInput };
    const result = await dispatch(addTodoThunkApi(newTodo));
    
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(addTodo({ id: nanoid(3), description: todoInput }));
      setTodoInput('');
      setShouldFetchTodos(true);
    }
  };

  const handleEditTodo = (id) => {
    setEditTodo(todos.find((todo) => todo._id === id) || null);
  };

  const handleUpdateTodo = async () => {
    if (!editTodo?.description.trim()) return;

    const updatePayload = { role, email, description: editTodo.description, todoId: editTodo._id };
    const result = await dispatch(editTodoThunkApi(updatePayload));
    
    if (result.meta.requestStatus === 'fulfilled') {
      setEditTodo(null);
      setShouldFetchTodos(true);
    }
  };

  const handleDeleteTodo = async (id) => {
    const result = await dispatch(deleteTodoThunkApi({ role, email, todoId: id }));
    if (result.meta.requestStatus === 'fulfilled') {
      setShouldFetchTodos(true);
    }
  };

  return (
    <div className='todoContainer'>
      <h1 className='todoTitle'>Task Master</h1>
      {role === roles.ADMIN && (
        <div className='todoInputContainer'>
          <input
            placeholder="Add todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className='todoInputField'
            // className='inputField'
          />
          <button onClick={handleAddTodo} className='addTodoBtn'>Add Todo</button>
        </div>
      )}
      <div className='todosListContainer'>
        {todos?.map((todo) => (
          <div key={todo._id} className='descriptContainer'>
            {(editTodo?._id === todo._id && role===roles.ADMIN) ? (
              <div className='eachTodoContainer'>
                <input
                  value={editTodo.description}
                  onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                  className='todoInputField editInput'
                />
                 <div className='editDeleteBtnsContainer'>
                <button onClick={handleUpdateTodo} className='editDeleteBtn'>Update</button>
                <button onClick={() => handleDeleteTodo(todo._id)} className='editDeleteBtn'>Delete</button>
                 </div>

              </div>
            ) : (
              <div className='eachTodoContainer'>
                <h2 className='todoDescription'>{todo.description}</h2>
                {role === roles.ADMIN && 
                // <div className='editDeleteBtnsContainer'>
                <div className='editDeleteBtnsContainer'>
                <button onClick={() => handleEditTodo(todo._id)} className='editDeleteBtn'>Edit</button>
                <button onClick={() => handleDeleteTodo(todo._id)} className='editDeleteBtn'>Delete</button>
                </div>
                // </div>
                }
              </div>
            )}
            {/* {role === roles.ADMIN && <button className='editDeleteBtn' onClick={() => handleDeleteTodo(todo._id)}>Delete</button>} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitWork;
