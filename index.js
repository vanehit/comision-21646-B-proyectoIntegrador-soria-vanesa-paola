import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

import { env } from "./src/settings/envs.js"
import { startConnection } from "./src/settings/database.js";

import authRouter from "./src/routes/authRoutes.js"; 
import postRouter from "./src/routes/postRoutes.js";
import commentRouter from "./src/routes/commentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

//configuramos las variables de entorno
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Configuramos Express para servir archivos estáticos desde la carpeta "public" en el frontend
const publicPath = path.join(__dirname, 'myDestiny-FrontEnd', 'public');
app.use(express.static(publicPath));

//mis rutas
app.get('/', (req, res) => {
  res.send('Welcome to MyDestiny!');
});
app.use("/auth", authRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// Manejamos los errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });
  
app.listen(env.PORT, async () => {
  try {
      await startConnection();
      console.log(`Database connected successfully!`);
      console.log(`Server is running on port ${env.PORT}`);
  } catch (error) {
      console.error(`Error connecting to the database: ${error.message}`);
  }
});
