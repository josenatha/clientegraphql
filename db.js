const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    b4wgpTaDpY50g2WA
    await mongoose.connect('mongodb+srv://josenathanielc:b4wgpTaDpY50g2WA@cluster0.9rwaknv.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    process.exit(1);
  }
};

module.exports = connectDB;
