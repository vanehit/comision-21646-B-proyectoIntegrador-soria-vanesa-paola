import React, { useState } from 'react';
import { connect } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { registerUser } from '../store/actions/authActions'; 
import Login from './Login';

const Register = ({ registerUser }) => {
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleAuthChange = () => {
    navigate.push(isRegister ? '/login' : '/register');
  };

  const handleRegister = async () => {
    try {
      // Datos del formulario 
      const userData = {
        username: 'nombreDeUsuario',
        password: 'contraseña',
        email: 'correo@ejemplo.com',
      };
  
      // Llamar a la acción de Redux para registrar al usuario
      await registerUser(userData);
  
      // Redirigir después del registro exitoso
      handleAuthChange();
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className="contenedor_inputs">
      <div className="contenedor_inputs_card">
        <div className="contenedor_inputs_card_izquierda">
          <img src="./assets/images/viajero.png" alt="img" />
          <div className="contenedor_inputs_card_izquierda_btn">
            <h2 className="font-bold montserrat">Hello Adventurer!</h2>
            <p className="font-bold poppins">
              {isRegister ? 'Already have an account?' : "Don't you have an account yet?"}
            </p>
            <button onClick={toggleForm} className="font-bold texto-naranja">
              {isRegister ? 'Log in here' : 'Sign up here'}
            </button>
          </div>
        </div>
        <div className="contenedor_inputs_card_derecha">
          {/* Deberías manejar el formulario de registro dentro de tu componente FormSignUp */}
          {isRegister ? <Register onAuthChange={handleAuthChange} /> : <Login />}
          <button onClick={handleRegister}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(Register);
