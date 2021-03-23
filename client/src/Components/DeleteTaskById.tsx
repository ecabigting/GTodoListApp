import React,{ useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_TASK } from '../GraphQL/Mutation';
import GetAllTask from './GetAllTask';

function DeleteTaskById(id:number) {
    const [deleteTask,{error}] = useMutation(DELETE_TASK);
    console.log("delete was click:" + id);
    deleteTask({variables: {id: id}});
    if(error)
    {
        console.log(error);
    }
    console.log("about to call get all task")
    return(<div></div>);
}

export default DeleteTaskById