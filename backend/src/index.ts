import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import usersRoutes from './routes/usersRoutes';
import generalRoutes from './routes/generalRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS
app.use(cors({
  // origin: 'http://localhost:5173',
  origin: ' http://127.0.0.1:5173',
  credentials: true,
}));

// Usar Morgan para registrar solicitudes
app.use(morgan('dev'));

app.use(express.json());

// Rutas
app.use(usersRoutes);
app.use(generalRoutes);

// Middleware para manejar rutas no encontradas (404)
app.use(notFoundHandler);

// Middleware de manejo de errores general
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
