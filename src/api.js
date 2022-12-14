import axios from 'axios';
// make a request for a user with a given id.
const Axios = axios.create({baseURL: process.env.REACT_APP_API_URL});


// To get Data
async function fetchTodos () {
  try {
    const response = await Axios.get('modelView/modelView/');  
    console.log(response.data);
    return response.data; 
  }
  catch{
    
  }
}


// To Post Data

async function postTodos(task){
  try{
    const response = await Axios.post('modelView/modelView/',{task});
    console.log(response.data);
    return response.data;
  }
  catch{

  }
}

//======To update Data======
async function updateTodos(id,task){
  try{
    const response = await Axios.patch(`modelView/modelView/${id}/`, {task});
    console.log(response.data);
    return response.data; 
  }catch{

  }
}




// To Delete Data

async function deleteTodos(id){
  try{
    const response = await Axios.delete(`modelView/modelView/${id}`);  
    console.log(response.data);
    return response.data; 
  }
  catch{

  }
}



export {Axios, fetchTodos, postTodos, deleteTodos, updateTodos};