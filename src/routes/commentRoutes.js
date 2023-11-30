import express from 'express';
import {
  getAllComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';

const commentRouter = express.Router();


// Ruta para obtener todos los comentarios
commentRouter.get('/all', async (req, res) => {
  try {
    await getAllComments(req, res);
  } catch (error) {
    console.error('Error en la ruta /comments/all:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

// Ruta para obtener un comentario por ID
commentRouter.get('/:commentId', async (req, res) => {
  try {
    await getCommentById(req, res);
  } catch (error) {
    console.error('Error en la ruta /comments/:commentId:', error);
    res.status(500).json({ error: 'Error al obtener detalles del comentario' });
  }
});


// Ruta para crear un nuevo comentario
commentRouter.post('/create', async (req, res) => {
  try {
    await createComment(req, res);
  } catch (error) {
    console.error('Error en la ruta /comments/create:', error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
});



// Ruta para actualizar un comentario por ID
commentRouter.put('/update/:commentId', async (req, res) => {
  try {
    await updateComment(req, res);
  } catch (error) {
    console.error('Error en la ruta /comments/update/:commentId:', error);
    res.status(500).json({ error: 'Error al actualizar el comentario' });
  }
});

// Ruta para eliminar un comentario por ID
commentRouter.delete('/delete/:commentId', async (req, res) => {
  try {
    await deleteComment(req, res);
  } catch (error) {
    console.error('Error en la ruta /comments/delete/:commentId:', error);
    res.status(500).json({ error: 'Error al eliminar el comentario' });
  }
});

export default commentRouter;
