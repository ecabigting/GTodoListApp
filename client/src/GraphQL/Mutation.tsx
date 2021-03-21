import { gql } from '@apollo/client'

export const CREATE_NEW_TASK = gql`
    mutation createTask(
        $task: String! 
        $completed:Boolean!){
        createTask(
            task : $task
            completed : $completed 
            ){
                id
                task
                completed
                createdOn
            }
    }
`;

export const DELETE_TASK = gql`
    mutation deleteTask($id : Int!) 
    {
        deleteTask(id : $id) 
        {
            id
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation deleteTask($id : Int! $task: String! $completed: Boolean!) 
    {
        updateTask(id : $id
            task: $task
            completed: $completed) 
        {
            id
            task
            completed
            createdOn
        }
    }
`;