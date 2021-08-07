const express = require('express');
const{graphqlHTTP} = require('express-graphql');
const{buildSchema} = require('graphql');

// (の中身は引数)。!はnullにならないことを示している

const schema = buildSchema(`
  type Query{
    hello:Test,
    myname(firstName:String!): String,
  }
  type Test {
    first:String,
    second:String
  }
`);

//リゾルバ関数
const root = { 
  hello:()=>{
    return {
      first: "eee",
      second: "oooo"
    }
  },
  myname:(jsonFirstName)=>{
    let yourName =  jsonFirstName["firstName"]+ "さん";
    return yourName;
  }
};

//graphiql:trueとしたので、GraphQLを利用できる
const app = express();
app.use('/graphql',graphqlHTTP({ 
    schema: schema, 
    rootValue: root, 
    graphiql: true,
  })
);
app.listen(4000);
console.log('Running a GraphQL APIserver at http://localhost:4000/graphql');
