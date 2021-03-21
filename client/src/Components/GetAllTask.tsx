import React,{ useEffect, useState } from 'react'
import { useQuery, gql, useMutation} from '@apollo/client'
import { GET_ALL_TASK } from '../GraphQL/Queries';
import { DELETE_TASK, UPDATE_TASK } from '../GraphQL/Mutation';


function GetAllTask()
{
    const {data} = useQuery(GET_ALL_TASK);
    const [deleteTask, {error}] = useMutation(DELETE_TASK);
    const [updateTask, {}] = useMutation(UPDATE_TASK);
    const [tasks, setTasks] = useState<any[]>([]);    
    useEffect(()=>{
        if(data) setTasks(data.getAllTask);
    },[data]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Status</td>
                        <td>Task</td>
                        <td>Created On</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((val)=>{
                        return (
                        <tr>
                            <td>
                                <input type="checkbox" 
                                checked={val.completed} onChange={(e)=>{
                                    updateTask({
                                        variables: {
                                            id: val.id,
                                            task:val.task,
                                            completed: Boolean(!e.target.value)
                                        }
                                    })
                                    e.target.checked = !e.target.checked;
                                }}/>
                            </td>
                            <td>{val.task}</td>
                            <td>{val.createdOn}</td>
                            <td>
                                <button id="{val.id}"
                                onClick={() => {
                                    deleteTask({
                                        variables : { id : val.id}
                                    })
                                }}
                                >Del</button>
                            </td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default GetAllTask
