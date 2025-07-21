require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Modelos
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Category = require('./models/Category');

// Leer archivo JSON
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed_data.json'), 'utf-8'));

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'PeyaDB'
    });

    console.log('🔌 Conectado a MongoDB Atlas');

    console.log('🧹 Limpiando colecciones existentes...');

    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("📂 Insertando categorías...");
    const categories = await Category.insertMany(data.categories);

    console.log('🍔 Insertando productos...');
    await Product.insertMany(data.products.map(product => {
      const category = categories.find(cat => cat.name === product.category);
      return {
        ...product,
        categoryId: category ? category._id : categories.find(cat => cat.name === "Foods")._id
      };
    }));

    console.log('👤 Insertando usuario demo...');
    const user = await User.create(data.user);
    const products = await Product.find().limit(2);

    console.log('👤 Insertando usuario order in user...');
    await Order.create({
      userId: user._id,
      orderDate: new Date().getTime(),
      totalAmount: products.reduce((total, product) => total + product.price, 0),
      totalItems: products.length,
      orderItems: products.map(product => ({
        productId: product._id.toString(),
        productName: product.name,
        productDescription: product.description,
        productImageUrl: product.imageUrl,
        productPrice: product.price,
        quantity: 1,
      }))
    });


    console.log('✅ Base de datos poblada con éxito!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

seedDatabase();
