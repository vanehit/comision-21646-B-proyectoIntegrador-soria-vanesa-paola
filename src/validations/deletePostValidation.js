// deletePostValidation.js
import { param } from 'express-validator';

const deletePostValidation = [
  param('postId').notEmpty().withMessage('El ID del post es requerido.'),
];

export default deletePostValidation;
