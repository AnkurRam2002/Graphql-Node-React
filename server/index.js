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
        `,
        resolvers: {},
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use('/graphql', expressMiddleware(server));
}
