const express = require('express');
const { MongoClient } = require('mongodb');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const uri = 'mongodb+srv://josenathanielc:b4wgpTaDpY50g2WA@cluster0.9rwaknv.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const app = express();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        db: client.db('Data'), // Utiliza el cliente de base de datos conectado
        client: client, // Pasa el cliente de base de datos
      }),
    });
    await server.start();

    server.applyMiddleware({ app });

    const port = 4000;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
