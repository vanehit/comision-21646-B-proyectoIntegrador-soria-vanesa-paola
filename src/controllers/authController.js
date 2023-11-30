//creamos el controlador de usuarios
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../settings/envs.js';


// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { username, password, email, avatarURL } = req.body;

    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Usuario ya registrado' });
    }

    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Si el usuario no está registrado, proceder con el registro
    const newUser = new User({ username, password: hashedPassword, email, avatarURL });
    await newUser.save();
    
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};


// Login de usuario
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por su correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña usando Bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver solo la información necesaria, no el objeto completo
    const userResponse = { _id: user._id, username: user.username, email: user.email };
    res.status(200).json({ token, user: userResponse });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener todos los usuarios desde la base de datos
const getAllUsersFromDatabase = async () => {
  try {
    const users = await User.find(); 
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios desde la base de datos:', error);
    throw error;
  }
};

// Obtener un usuario por su ID
const getUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    res.status(500).json({ error: 'Error al obtener detalles del usuario' });
  }
};


// Actualizar información de un usuario por su ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, password, email, avatarURL } = req.body;

    const user = await User.findByIdAndUpdate(userId, { username, password, email, avatarURL }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

export { 
  registerUser, 
  loginUser,
  getAllUsersFromDatabase,
  getUserId, 
  updateUser, 
  deleteUser 
};

