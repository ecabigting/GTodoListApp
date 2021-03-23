import React from 'react';
import './App.css';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import ToDoList from './Components/ToDoList';

const errorLink = onError(({ graphQLErrors, networkError}) => {
  if(graphQLErrors) {
    graphQLErrors.map(({message,locations,path})=>{
      alert(`GraphQL error: ${message}`);
    });
  }
});

const apiLink = from([
  errorLink,
  new HttpLink({uri: "http://localhost:3001/graphql"}),
]);

const aClient = new ApolloClient({
  cache : new InMemoryCache(),
  link : apiLink
});


function App() {
  return (<ApolloProvider client={aClient} >
    {" "}
    <ToDoList/>
  </ApolloProvider>);
}

export default App;
