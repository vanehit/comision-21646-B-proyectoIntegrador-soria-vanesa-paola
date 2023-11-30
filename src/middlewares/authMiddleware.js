// creamos el authMiddleware

import jwt from 'jsonwebtoken';
import { env } from '../settings/envs.js';

const authenticateUser = (req, res, next) => {
  // Obtenemos el token del encabezado de la solicitud
  const token = req.header('Authorization');

  // Verificamos si hay un token
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    // Verificamos y decodificar el token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Agregamos la información del usuario decodificado al objeto de solicitud
    req.user = decoded;
    next(); // Permitimos con next que la solicitud continúe al siguiente middleware o controlador
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token no válido' });
  }
};

export { authenticateUser };
