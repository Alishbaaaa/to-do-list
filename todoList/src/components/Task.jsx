import React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaBeer } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const Task = () => {
    
    const [tasks,setTasks] = useState([]);
    const [task,setTask] = useState("");
    const [showFinishedTasks,setShowFinishedTasks] = useState(true);

    useEffect (() => {
        let taskString = localStorage.getItem("tasks");
        if(taskString )
        {
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            setTasks(tasks);
        }

    },[])

    const savetoLocalStorage = (params) => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    const handleAdd = () =>
    {
        setTasks([...tasks,{id: uuidv4(),newTask:task, isCompleted:false}]);
        setTask("");
        console.log(tasks);
        savetoLocalStorage();
    }

    const handleChange = (e) => 
    {
        setTask(e.target.value);
    }

    const handleCheckbox = (e) =>
    {
        let id = e.target.name;
        console.log(`the id is ${id}`);
        let index = tasks.findIndex(taskItem=>{
            return taskItem.id === id;
        })
        console.log(`the index is ${index}`);
        // next pointer to array so re-render
        let newTasks = [...tasks];
        newTasks[index].isCompleted = !newTasks[index].isCompleted;
        setTasks(newTasks);
        savetoLocalStorage();

    }

    const handleDelete = (e,id) =>
    {
       let newTasks = tasks.filter((taskItems) =>{
        return taskItems.id != id;
       })
       setTasks(newTasks);
       savetoLocalStorage();
    }

    const handleEdit = (e,id) =>
    {
       let t = tasks.filter(i=> i.id === id)
    //    console.log(`this is t = ${t}`);
    //    console.log(`this is t[0] = ${t[0]}`);
        setTask(t[0].newTask);  
        
        let newTasks = tasks.filter(taskItem => {
            return taskItem.id != id
        });
        setTasks(newTasks)
        savetoLocalStorage();
    }

    const toggleFinished = (e) =>{
        setShowFinishedTasks(!showFinishedTasks);
    }
  return (
    <div className="main flex justify-center pt-20">
        <div className="container w-2/3 h-auto my-5 p-5 bg-violet-50 text-center flex flex-col items-center justify-center">
            <div className="relative w-80 min-h-24 bg-blue-100 rounded-xl z-10  ">
                {/* Edge div for overlapping effect */}
                <div className="absolute w-80 h-12 bg-blue-200 rounded-t-xl">
            </div>
                <div className="border-2 border-zinc-600 rounded-xl w-80 z-20 min-h-40 transform translate-x-2 -translate-y-1 pb-1">
                <div className="date w-80 h-12  border-b-2 border-zinc-600  tasks flex justify-between items-center px-4 py-0.5">
                    <input className ="rounded-lg"id = "input-task" type="text" name = "tasks" value={task} onChange={handleChange}></input>
                    <div className= 'flex flex-row items-center gap-2 pl-3 h-8 w-80 pt-1'>
                    <input onChange = {toggleFinished} type="checkbox" checked={showFinishedTasks}></input>
                    </div>
                    <button className="text-3xl text-slate-600 hover:text-white transition-all disabled:text-slate-600" disabled = {task.length<=3} onClick = {handleAdd}>+</button>
                </div>    

                    {tasks.length === 0 && <div className='my-5'>No Tasks to Display</div>}
                    {tasks.map((taskItem,index) => {
                        return( (showFinishedTasks || !taskItem.isCompleted) &&
                            <div key = {index} className='flex flex-row justify-between items-center pt-2 pr-3 pb-1 border-b-2 border-zinc-600
                            mr-5 ml-3 mt-2'> 
                                <div className='flex items-center gap-2 '>
                                  
                                    <input name = {taskItem.id} type="checkbox" checked={taskItem.isCompleted} onChange={handleCheckbox}></input>
                                    
                                    <div  className = {`${taskItem.isCompleted ? 'line-through' : ''} `}>{taskItem.newTask}
                                    </div>
                                </div>    
                                <div className='flex space-x-3 '>
                                    <button onClick={(e) => handleEdit(e,taskItem.id)}><BiEditAlt /></button>
                                    <button onClick={(e) => handleDelete(e,taskItem.id)}><MdDeleteForever /></button>
                                </div>
                            </div>
                            
                           
                        )
                    })}
               

            </div>
        
            </div>
        </div>
    </div>
  );
};

export default Task;
