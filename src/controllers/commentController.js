import Comment from '../models/Comment.js';


// Creamos un nuevo comentario
const createComment = async (req, res) => {
  try {
    const { author, description } = req.body;

    const newComment = new Comment({ author, description });

    await newComment.save();

    res.status(201).json({ message: 'Comentario creado con éxito', comment: newComment });
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

// Obtenenemos todos los comentarios
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

// Obtenemos un comentario por ID
const getCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    res.status(200).json({ comment });
  } catch (error) {
    console.error('Error al obtener detalles del comentario:', error);
    res.status(500).json({ error: 'Error al obtener detalles del comentario' });
  }
};

// Actualizamos un comentario por ID
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { author, description } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { author, description },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    res.status(200).json({ message: 'Comentario actualizado con éxito', comment: updatedComment });
  } catch (error) {
    console.error('Error al actualizar el comentario:', error);
    res.status(500).json({ error: 'Error al actualizar el comentario' });
  }
};

// Eliminamos un comentario por ID
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    res.status(200).json({ message: 'Comentario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    res.status(500).json({ error: 'Error al eliminar el comentario' });
  }
};

export { 
    createComment, 
    getAllComments, 
    getCommentById, 
    updateComment, 
    deleteComment
 };
