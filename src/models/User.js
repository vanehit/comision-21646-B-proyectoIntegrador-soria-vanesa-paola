//creamos el modelo User
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true,
    required: true },
  password: { 
    type: String, 
    required: true },
  email: { 
    type: String,
    unique: true,  
    required: true },
  avatarURL: { 
    type: String },
});

const User = mongoose.model('User', userSchema);

export default User;
