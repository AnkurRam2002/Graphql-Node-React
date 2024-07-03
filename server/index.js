const express = require('express');
const { ApolloServer } = require('@apollo/server');
const bodyParser = require('body-parser');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');

async function startServer(){
    const app = exprerss();
    const server = new ApolloServer({
        typeDefs: `
            type Todo {
                id: ID!
                title: String!
                completed: Boolean!
            }

            type Query {
                getTodos: [Todo]
            }
        `,
        resolvers: {
            Query: {
                getTodos: () => {
                    return [
                        {
                            id: 1,
                            title: 'Todo 1',
                            completed: false,
                        },
                        {
                            id: 2,
                            title: 'Todo 2',
                            completed: true,
                        },
                    ];
                },
        },
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen(8000, () => console.log('Server is running on http://localhost:8000'));
}
