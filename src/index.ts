// IMPORT LIBRARY
import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'; // Import swagger-ui-express

// IMPORT MODULE
import swaggerDocs from './infrastructure/config/swagger';
import connectDB from './infrastructure/database/mongo';
import routers from './routes';

// Load environment variables from .env file
dotenv.config();

// Start connection to DB
connectDB();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

// Middleware to parse JSON
app.use(express.json());

routers(app);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req: Request, res: Response) => {
  res.send('Technical Test for PT EIGEN TRI MATHEMA Started');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
