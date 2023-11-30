// updatePostValidation.js
import { param, body } from 'express-validator';

const updatePostValidation = [
  param('postId').notEmpty().withMessage('El ID del post es requerido.'),
  body('title').optional().isString().withMessage('El título debe ser un string'),
  body('description').optional().isString().withMessage('La descripción debe ser un string'),
  body('comments').optional().isArray().withMessage('Los comentarios deben ser un array'),
  body('imageURL').optional().isURL().withMessage('La imagen debe ser una URL válida'),
];

export default updatePostValidation;
