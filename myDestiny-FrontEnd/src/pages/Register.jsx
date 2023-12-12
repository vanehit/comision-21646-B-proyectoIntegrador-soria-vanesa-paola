// SignUp.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/actions/authActions';
import Login from './Login';

const SignUp = ({ registerUser }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleAuthChange = () => {
    navigate.push(isRegister ? '/login' : '/register');
  };

  const handleRegister = async () => {
    try {
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
          {isRegister ? (
            <form>
              {/* Agrega los campos del formulario */}
              <input
                type="text"
                placeholder="Username"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </form>
          ) : (
            <Login />
          )}
          <button onClick={handleRegister}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(SignUp);
