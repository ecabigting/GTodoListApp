import { gql } from '@apollo/client'

export const GET_ALL_TASK = gql`
    query {
        getAllTask {
            id
            task
            completed
            createdOn
        }
    }
`;