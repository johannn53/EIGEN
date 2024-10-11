// IMPORT LIBRARY
import swaggerJsDoc from 'swagger-jsdoc';

// SWAGGER OPTIONS
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Technical Test API for PT EIGEN TRI MATHEMA',
      version: '1.0.0',
      description: 'API documentation for the technical test.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./src/domain/**/*.ts'], // Include all files in the domain folder for swagger documentation
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// EXPORT MODULE
export default swaggerDocs;
