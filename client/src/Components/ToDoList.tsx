import { useEffect, useState } from 'react'
import { useQuery, useMutation} from '@apollo/client'
import { GET_ALL_TASK } from '../GraphQL/Queries';
import { CREATE_NEW_TASK, DELETE_TASK, UPDATE_TASK } from '../GraphQL/Mutation';

function ToDoList()
{
    const {data} = useQuery(GET_ALL_TASK);
    const [tasks, setTasks] = useState<any[]>([]);    
    
    const [task, setTask] = useState("");
    
    useEffect(()=>{
        if(data) setTasks(data.getAllTask);
    },[data]);
    
    const [AddNewTask] = useMutation(CREATE_NEW_TASK,{
        update : (proxy,mutationResult)=>{
            console.log(mutationResult);
            setTask("");
            setTasks([
                ...tasks,
                {
                    id: mutationResult.data.createTask.id,
                    task: mutationResult.data.createTask.task,
                    completed: mutationResult.data.createTask.completed,
                    createdOn: mutationResult.data.createTask.createdOn
                } 
            ]);
        },
        variables : {task: task,completed : false}
    });

    const [DeleteTask] = useMutation(DELETE_TASK)
    const [UpdateTask] = useMutation(UPDATE_TASK)
    const SortList = () => {
        let tasksSort = [...tasks];
        console.log("clicked");
        setTasks(tasksSort.sort(sortFunction));
    }

    function sortFunction(a: { createdOn:Date; },b: { createdOn:Date; }){  
        var dateA = new Date(a.createdOn).getTime();
        var dateB = new Date(b.createdOn).getTime();
        console.log(a);
        return dateB > dateA ? 1 : -1;  
    }; 

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Status</td>
                        <td>Task</td>
                        <td><a onClick={SortList}> Created On</a></td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((val)=>{
                        return (
                        <tr>
                            <td>
                                <input type="checkbox" 
                                    checked={val.completed} 
                                    onChange={(e)=>{
                                        UpdateTask({
                                            update:(proxy,mutationResult)=>{
                                                setTasks(mutationResult.data.updateTask)
                                            },
                                            variables:{
                                                id: val.id,
                                                task: val.task,
                                                completed: e.target.checked
                                            }
                                        })
                                    }}
                                />
                            </td>
                            <td>{val.task}</td>
                            <td>{val.createdOn}</td>
                            <td>
                                <button id="{val.id}"
                                onClick={()=>{
                                    DeleteTask({update:(proxy,mutationResult)=>{
                                                    setTasks(mutationResult.data.deleteTask);
                                                },
                                                variables: {id:val.id}});
                                }}
                                >Del</button>
                            </td>
                        </tr>);
                    })}
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input
                            type="text"
                            placeholder="New Task"
                            onChange={(e)=>{setTask(e.target.value)}}/>
                        </td>
                        <td>
                            <button onClick={AddNewTask as any}>
                                Add new Task
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

}

export default ToDoList