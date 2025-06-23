const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Peya Delivery API',
      version: '1.0.0',
      description: 'Documentación de la API REST para la app tipo Rappi desarrollada por David Pérez'
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor local de desarrollo'
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
