import React, { useState } from 'react'
import { CREATE_NEW_TASK } from '../GraphQL/Mutation'
import { useMutation } from '@apollo/client'

function NewTaskForm(){
    const [task, setNewTask] = useState("");
    const [createTask, { error }] = useMutation(CREATE_NEW_TASK);
    
    const addNewTask = () => {
        createTask({
            variables : {
                task: task,
                completed: false
            }
        });

        if(error)
        {
            console.log(error);
        }
        console.log("new task:" + task + " has been added!");
        
    };

    return(
        <div>
            <input
                type="text"
                placeholder="New Task"
                onChange={(e)=>{setNewTask(e.target.value)}}
            />
            <button onClick={addNewTask}>
                Add new Task
            </button>
        </div>
    );
}

export default NewTaskForm
