import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const history = useHistory();

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleAuthChange = () => {
    history.push(isSignUp ? '/Signin' : '/Signup');
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Datos del formulario (nombre de usuario, contraseña, email, avatarURL, etc.)
        }),
      });

      if (response.ok) {
        // Registro exitoso, manejar la respuesta o redirigir
        handleAuthChange();
      } else {
        // Manejar errores de registro
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
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
              {isSignUp ? 'Already have an account?' : "Don't you have an account yet?"}
            </p>
            <button onClick={toggleForm} className="font-bold texto-naranja">
              {isSignUp ? 'Log in here' : 'Sign up here'}
            </button>
          </div>
        </div>
        <div className="contenedor_inputs_card_derecha">
          {isSignUp ? <FormSignUp onAuthChange={handleAuthChange} /> : <FormSignIn />}
        </div>
      </div>
    </div>
  );
};

export default Register;
