import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';
import { fetchMock } from './utils'

const ToDoList = (props) => {
  const [loading, setLoading] = useState(false);
  const { toDoList, handleToggle, handleFilter, handleDelete, updateTask } = props;

  // TO get the id of each task
  const setId = (id, task) => {

    localStorage.setItem('Id', id);
    localStorage.setItem('task', task);
    task = "Apple";
    // console.log(id,task);

  }

  const [currentEdit, setCurrentEdit] = useState();

  // const showForm = () => {
  //   setEdit(!showForm);
  // }

  // To 
  // useEffect()=>{
  //   setTask
  // }

  return (
    <div >
      {toDoList.map(todo => {
        return (
          <>
            <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter} />
            <button style={{ margin: '20px', padding: '5px', backgroundColor: "red", cursor: 'pointer' }} onClick={() => handleDelete(todo.id)}>Delete</button>

            {/* {loading ? 
            <form>
              <input name='name' type='text' value={todo.task}/>
              <button>Submit</button>
            </form> : <button style={{ margin: '20px', padding: '5px', backgroundColor: "seagreen", cursor: 'pointer'}} onClick={ async () => {
              setId(todo.id, todo.task);
            }}> Edit </button>} */}


            <button style={{ margin: '20px', padding: '5px', backgroundColor: "seagreen", cursor: 'pointer' }} onClick={() => setCurrentEdit(todo.id)
            }> Edit </button>

            {currentEdit === todo.id ?
              <form onSubmit={async (e) => {
                e.preventDefault();
                console.log(e.target.updatedName.value);
                try {
                  await updateTask({ ...todo, task: e.target.updatedName.value });
                  setCurrentEdit(null);
                } catch {

                }
              }
              }
              >
                <input name='updatedName' type='text' placeholder={todo.task} />
                <button  >Submit</button>
              </form>
              :
              null
            }

            <br />
          </>
        )
      })}
      <button style={{ margin: '20px' }} onClick={handleFilter}>Clear Completed</button>
      {loading ? "I Am Loading . . . " : <button onClick={async () => {
        setLoading(true);
        const response = await fetchMock();
        console.log(response);
        setLoading(false);
      }}> Trigger Request </button>}
    </div>
  );
};

export default ToDoList;