import Post from '../models/Post.js';
import { validationResult } from 'express-validator';


// Obtener todos los posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: 'Lista de posts obtenida correctamente', posts });
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};


// Crear posts
const createPost = async (req, res) => {
  try {
    // Aplicamos las validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, author, comments, imageURL } = req.body;

    // Verificamos si ya existe un post con el mismo título
    const existingPost = await Post.findOne({ title });

    if (existingPost) {
      return res.status(400).json({ error: 'Ya existe un post con el mismo título.' });
    }

    const newPost = new Post({ title, description, author, comments, imageURL });

    await newPost.save();
    res.status(201).json({ message: 'Post creado con éxito', post: newPost });
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ error: 'Error al crear el post' });
  }
};


// Actualizamos los posts
const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, description, author, comments, imageURL } = req.body;

    // Validamos los campos del post antes de procesarlos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, description, author, comments, imageURL },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json({ message: 'Post actualizado con éxito', post: updatedPost });
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
};

// Borramos posts
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json({ message: 'Post eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};

export { 
  getPosts,
  createPost, 
  updatePost, 
  deletePost 
};
