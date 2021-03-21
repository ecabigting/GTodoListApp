const express = require("express");
const app = express();
const PORT = 3001;
const cors = require('cors');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");

app.use(cors());
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(PORT, () => {
    console.log("Server Running port: 3001")
})

app.use(cors());