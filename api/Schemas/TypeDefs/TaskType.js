const graphql = require("graphql");
const { 
    GraphQLObjectType,
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLInt
} = graphql;


const TaskType = new GraphQLObjectType({
    name: "Task",
    fields : () => ({
        id: { type : GraphQLInt },
        task: { type : GraphQLString },
        completed: { type : GraphQLBoolean },
        createdOn : { type : GraphQLString }
    })
});

module.exports = TaskType