declare module 'swagger-jsdoc' {
  import { SwaggerDefinition } from 'swagger-schema-official';

  interface Options {
    swaggerDefinition: SwaggerDefinition;
    apis: string[];
  }

  function swaggerJSDoc(options: Options): any;

  export = swaggerJSDoc;
}
