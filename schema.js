// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    email: String
  }

  type Query {
    usuarios: [Usuario]
    usuario(id: ID!): Usuario
  }

  type Mutation {
    crearUsuario(nombre: String, email: String): Usuario
    eliminarUsuario(id: ID!): Boolean
    actualizarUsuario(id: ID!, nombre: String, email: String): Usuario
  }
`;

module.exports = typeDefs;
