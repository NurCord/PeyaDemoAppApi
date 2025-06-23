const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Parsear JSON

const PORT = process.env.PORT || 4000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

const foodRoutes = require('./routes/foods');
app.use('/foods', foodRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const orderRoutes = require('./routes/orders');
app.use('/orders', orderRoutes);

app.get('/ping', (req, res) => res.send('pong'));

const setupSwagger = require('./swagger');
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
