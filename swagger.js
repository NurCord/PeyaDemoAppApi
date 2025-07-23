const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Peya Delivery API',
      version: '1.0.0',
      description: 'Documentación de la API REST para la app tipo Rappi desarrollada por David Pérez',
      contact: {
        name: 'David Pérez',
        email: 'dpereze1105@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor local de desarrollo'
      },
      {
        url: 'https://tu-api.onrender.com',
        description: 'Servidor de producción (Render)'
      }
    ],
    tags: [
      {
        name: 'Products',
        description: 'Endpoints para gestión de productos'
      },
      {
        name: 'Categories',
        description: 'Endpoints para gestión de categorías'
      },
      {
        name: 'Users',
        description: 'Endpoints para gestión de usuarios'
      },
      {
        name: 'Orders',
        description: 'Endpoints para gestión de pedidos'
      }
    ]
  },
  apis: ['./routes/*.js'], // <-- importante: lee las rutas con JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
