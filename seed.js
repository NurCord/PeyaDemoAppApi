require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Modelos
const Food = require('./models/Food');
const User = require('./models/User');
const Order = require('./models/Order');

// Leer archivo JSON
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed_data.json'), 'utf-8'));

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'PeyaDB'
    });

    console.log('🔌 Conectado a MongoDB Atlas');

    console.log('🧹 Limpiando colecciones existentes...');
    await Food.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log('🍔 Insertando comidas...');
    await Food.insertMany(data.foods);

    console.log('👤 Insertando usuario demo...');
    await User.create(data.user);

    console.log('✅ Base de datos poblada con éxito!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

seedDatabase();
