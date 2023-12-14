import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/actions/authActions';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import './Register.css'


const SignUp = ({ isAuthenticated, registerUser }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formReset, setFormReset] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
    setFormReset(false); // Reiniciamos el formulario cuando se cambia entre registro e inicio de sesión
  };

  const handleAuthChange = () => {
    navigate.push(isRegister ? '/login' : '/register');
  };

  const handleRegister = async () => {
    try {
      // Verificamos que todos los campos estén llenos
      if (!userData.username || !userData.password || !userData.email) {
        alert('Por favor, complete todos los campos antes de enviar.');
        return;
      }
  
      await registerUser(userData);
  
      // No mostrar el modal aquí
  
      setShowModal(true);
      setFormReset(true); // habilita el reinicio del form
      navigate('/'); // Redirige a la página principal después del registro exitoso
    } catch (error) {
      // Manejamos el error aquí si es necesario
      console.error('Error during registration:', error);
  
      if (error.response) {
        console.log('Error response:', error.response);
        if (error.response.status === 400) {
          // Si el error es un 400 (Bad Request), significa que el usuario ya existe
          alert('El usuario ya está registrado. Por favor, elija otro nombre de usuario.');
        } else {
          // Manejo para otros tipos de error
          alert('Error durante el registro. Por favor, inténtelo de nuevo más tarde.');
        }
      } else {
        // Si no hay una respuesta del servidor, manejar el error de otra manera
        console.log('Error sin respuesta del servidor:', error);
        alert('Error durante el registro. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };
  
  

  const handleModalClose = () => {
    setShowModal(false);
    if (formReset) {
      setUserData({ username: '', password: '', email: '' });
    }
    handleAuthChange();
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-8 offset-md-3">
          <div className="card">
            <div className="card-body">
              <img
                src="./assets/images/viajero.png"
                alt="img"
                className="mb-3 img-fluid mx-auto d-block"
                style={{ maxWidth: '150px' }} 
              />
              <h2 className="text-center font-bold montserrat">Hello Adventurer!</h2>
              <p className="text-center font-bold poppins">
                {isRegister ? 'Already have an account?' : "Don't you have an account yet?"}
              </p>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleRegister}
                >
                  {isAuthenticated ? 'Log In' : 'Sign Up'}
                </button>
              </form>
              <p className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleForm}
                >
                  {isAuthenticated ? 'Log in here' : 'Sign up here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal showModal={showModal} handleClose={handleModalClose} userData={userData} />
    </div>
  );
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(SignUp);
