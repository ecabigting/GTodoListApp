const graphql = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLList,
    GraphQLInt
} = graphql;
const fs = require("fs");
const taskData = require("../task_data.json");
const TaskType = require("./TypeDefs/TaskType.js");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllTask : {
            type: new GraphQLList(TaskType),
            resolve(parents,args) {
                return taskData
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        createTask : {
            type: TaskType,
            args: {
                task: { type : GraphQLString },
                completed: { type : GraphQLBoolean }
            },
            resolve(parents,args) {
                let lastIDOf = getLastId(taskData);
                taskData.push({
                    id : lastIDOf + 1,
                    task : args.task,
                    completed : args.completed,
                    createdOn : getCurrentDateTime()
                });
                updateFile(taskData);
                return taskData[taskData.length - 1];
            }
        },
        updateTask : {
            type : new GraphQLList(TaskType),
            args : {
                id: {type : GraphQLInt},
                task: { type : GraphQLString },
                completed: { type : GraphQLBoolean }
            },
            resolve(parents,args)
            {
                taskData.some((d)=>{
                    if(d.id == args.id)
                    {
                        d.task = args.task;
                        d.completed = args.completed;
                        return true;
                    }
                });
                updateFile(taskData);
                return taskData;
            }
        },
        deleteTask:
        {
            type:new GraphQLList(TaskType),
            args : {
                id: {type : GraphQLInt}
            },
            resolve(parents,args)
            {
                let newTD = taskData.filter(td => td.id != args.id); 
                updateFile(newTD);
                return newTD;
            }
        }
    }
});

function getLastId(td)
{
    if(td.length > 0)
    {
        return td[td.length-1].id;
    }else
    {
        return 0;
    } 
}

function updateFile(taskD)
{
    fs.writeFile("./task_data.json", JSON.stringify(taskD,null,2),function(err){
      if(err)throw err;
      console.log("Done Updating!");  
    });
}

function getCurrentDateTime()
{
    let currentDT = new Date;
    return currentDT.getFullYear() + "-" 
    + currentDT.getMonth() + "-" 
    + currentDT.getDate() + "T"
    + currentDT.getHours() + ":" 
    + currentDT.getMinutes() + ":"
    + currentDT.getSeconds() + "." + currentDT.getMilliseconds();
};

module.exports = new GraphQLSchema({query:RootQuery,mutation: Mutation});