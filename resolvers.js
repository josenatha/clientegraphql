// resolvers.js
const { ObjectId } = require('mongodb');

const resolvers = {
  Query: {
    usuarios: async (_, __, { db }) => {
      const usuariosCollection = db.collection('usuarios');
      const usuarios = await usuariosCollection.find().toArray();
      return usuarios.map(usuario => ({
        id: usuario._id.toString(),
        nombre: usuario.nombre,
        email: usuario.email,
      }));
    },
    usuario: async (_, { id }, { db }) => {
      const usuariosCollection = db.collection('usuarios');
      const usuario = await usuariosCollection.findOne({ _id: ObjectId(id) });
      if (!usuario) return null;
      return {
        id: usuario._id.toString(),
        nombre: usuario.nombre,
        email: usuario.email,
      };
    },
  },
  Mutation: {
    crearUsuario: async (_, args, { db, client }) => {
      const usuariosCollection = db.collection('usuarios');
      const nuevoUsuario = {
        nombre: args.nombre,
        email: args.email,
      };
    
      const result = await usuariosCollection.insertOne(nuevoUsuario);
    
      return {
        id: result.insertedId,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
      };
    },
    eliminarUsuario: async (_, { id }, { db }) => {
      const usuariosCollection = db.collection('usuarios');
      
      const result = await usuariosCollection.deleteOne({ _id: new ObjectId(id) });

      return result.deletedCount === 1;
    },

    actualizarUsuario: async (_, { id, nombre, email }, { db }) => {
      const usuariosCollection = db.collection('usuarios');
      const result = await usuariosCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { nombre, email } },
        { returnOriginal: false }
      );
      return result.value;
    },
    
  },
};

module.exports = resolvers;
