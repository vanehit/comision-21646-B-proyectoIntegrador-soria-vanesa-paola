// creamos el createPostValidation
import { body } from "express-validator";
import validator from 'validator';


const createPostValidation = [
  body('title').notEmpty().withMessage('El título es requerido.').isString().withMessage('El título debe ser un string'),
  body('description').notEmpty().withMessage('La descripción es requerida.').isString().withMessage('La descripción debe ser un string'),
  body('author').notEmpty().withMessage('El autor es requerido.').isString().withMessage('El autor debe ser un string'),
  body('comments').isArray().withMessage('Los comentarios deben ser un array'),
  body('imageURL').notEmpty().withMessage('La URL de la imagen es requerida.')
    .custom(value => {
      // Verificamos si es una URL absoluta o una ruta relativa
      if (!value.startsWith('http://') && !value.startsWith('https://')) {
        // Si no comienza con 'http://' o 'https://', asumir que es una ruta relativa
        return true;
      }

      // Si comienza con 'http://' o 'https://', validar como una URL completa
      return validator.isURL(value, { require_protocol: true });
    })
    .withMessage('La imagen debe ser una URL válida'),
  ];

  export default createPostValidation;
