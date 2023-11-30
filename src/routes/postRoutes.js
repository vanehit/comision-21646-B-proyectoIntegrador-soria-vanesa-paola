// creamos el postRoutes
import express from 'express';
import { createPost, updatePost, deletePost, getPosts } from '../controllers/postController.js';
import createPostValidation from '../validations/createPostValidation.js';
import updatePostValidation from '../validations/updatePostValidation.js';
import deletePostValidation from '../validations/deletePostValidation.js';




const postRouter = express.Router();

// Ruta para obtener todos los posts (GET)
postRouter.get('/', getPosts);

// Ruta para crear un nuevo post con el middleware de validación
postRouter.post('/create', createPostValidation , createPost, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createPost(req, res);
  });

// Ruta para actualizar un post por ID con (PUT)
postRouter.put('/update/:postId', updatePostValidation, updatePost, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updatePost(req, res);
  });
  
  // Ruta para eliminar un post por ID con (DELETE)
  postRouter.delete('/delete/:postId', deletePostValidation, deletePost, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    deletePost(req, res);
  });
export default postRouter;
