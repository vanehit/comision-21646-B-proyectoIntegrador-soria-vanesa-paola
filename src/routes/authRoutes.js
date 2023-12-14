import express from 'express';
import { registerUser, getUserId, updateUser, deleteUser, loginUser, getAllUsersFromDatabase } from '../controllers/authController.js';

const authRouter = express.Router();

// Ruta para obtener detalles del usuario por ID con (GET)
authRouter.get('/user/:userId', async (req, res) => {
  try {
    const result = await getUserId(req, res);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en la ruta /user/:userId:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al obtener detalles del usuario' });
  }
});

// Ruta para registrar un nuevo usuario con (POST)
authRouter.post('/register', async (req, res) => {
  try {
    const result = await registerUser(req, res);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error en la ruta /register:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al registrar usuario' });
  }
});

// Ruta para iniciar sesión con (POST)
authRouter.post('/login', async (req, res) => {
  try {
    const result = await loginUser(req, res);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en la ruta /login:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al iniciar sesión' });
  }
});

// Ruta para obtener todos los usuarios
authRouter.get('/all', async (req, res) => {
  try {
    const users = await getAllUsersFromDatabase(); // obtenemos los usuarios
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Ruta para actualizar información de un usuario por ID con (PUT)
authRouter.put('/user/:userId', async (req, res) => {
  try {
    const result = await updateUser(req, res);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en la ruta /user/:userId:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al actualizar usuario' });
  }
});

// Ruta para eliminar un usuario por ID con (DELETE)
authRouter.delete('/user/:userId', async (req, res) => {
  try {
    const result = await deleteUser(req, res);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en la ruta /user/:userId:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al eliminar usuario' });
  }
});

export default authRouter;
