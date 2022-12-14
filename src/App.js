import React, { useEffect, useState } from 'react';
// import data from './data.json';
import Header from './header';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';

import './App.css';
import { fetchTodos, postTodos, deleteTodos, updateTodos } from './api';


//===========Importing Axios=========
import axios from 'axios';
// make a request for a user with a given id.
const Axios = axios.create({ baseURL: process.env.REACT_APP_API_URL });

function App() {
  // const [toDoList, setToDoList]= useState(data);

  //Fetchin through API
  const [toDoList, setToDoList] = useState([]);

  // =============for editing data============
  const [edit, setEdit] = useState(false);



  // Component_Did_Mount() // ==============To fetch all data from data base==============
  useEffect(() => {
    fetchTodos().then((todoList) => {
      setToDoList(todoList);
    });
  }, []);


  //Display data that should be edited
  // useEffect(()=>{
  //   updateTodos().then((todoList)=>{
  //     setToDoList(todoList);
  //   });
  // }, []);

  // To Handle Task completion
  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : task;
    });
    setToDoList(mapped);
  }


  //To Delete striked task
  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setToDoList(filtered);
  };


  //To add new task
  const addTask = async (userInput) => {
    const todo = await postTodos(userInput);
    setToDoList((prev) => {
      return [...prev, todo];
    });
  }


  // To Update the task
  // const handleUpdate = async(id,task)=>{
  //   const todo = await updateTodos(id,task);
  //   setToDoList((prev)=>{
  //     return [...prev, ]
  //   })
  // }


  //========TO EDIT=======

  const updateTask = async (todo) => {
    try {
      const { id, task } = todo;
      const todoRes = await updateTodos(id, task);
      setToDoList((prev)=>{
        return prev.map(item=>{
          return item.id === id ? todo : item                    
        })
      });
    } catch {

    }
  }



  // To delete each list
  const handleDelete = async (id) => {

    // await Axios.delete(`modelView/modelView/${id}`);
    // const newdelete = toDoList.filter((todo)=>{
    //   return todo.id !== id;
    // });
    // setToDoList(newdelete);

    try {
      await deleteTodos(id);
      setToDoList((prev) => {
        return prev.filter(todo => {
          return todo.id !== id;
        })
      });
    }
    catch {

    }

  }

  return (
    <div className="App">
      <Header />
      <ToDoList
        toDoList={toDoList}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleFilter={handleFilter}
        updateTask={updateTask}
      />
      <ToDoForm addTask={addTask} />
    </div>
  );
}

export default App;
