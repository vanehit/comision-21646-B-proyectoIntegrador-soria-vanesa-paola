import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/actions/authActions';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import { Link as Anchor } from 'react-router-dom';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import './Login.css';

const Login = ({ isAuthenticated, loginUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true); // Indicar que la autenticación está en progreso
      await loginUser(userData);
      setShowModal(true); // Mostramos el modal después del inicio de sesión exitoso
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.status === 401) {
        alert('Credenciales inválidas. Por favor, verifique su correo electrónico y contraseña.');
      } else {
        alert('Error durante el inicio de sesión. Por favor, inténtelo de nuevo más tarde.');
      }
    } finally {
      setLoading(false); // Indicar que la autenticación ha terminado, independientemente del resultado
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUserData({ email: '', password: '' });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-8 offset-md-3">
          <div className="card">
            <div className="card-body">
              <img
                src="./assets/images/profile.png"
                alt="img"
                className="mb-3 img-fluid mx-auto d-block"
                style={{ maxWidth: '150px' }}
              />
              <h2 className="text-center font-bold montserrat">Hello Adventurer!</h2>
              <h3 className="text-center font-bold montserrat">Log In Here!</h3>

              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="button"
                  onClick={handleLogin}
                  block
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      {' Logging in...'}
                    </>
                  ) : (
                    'Log In'
                  )}
                </Button>
              </Form>

              {!isAuthenticated && (
                <p className="text-center font-bold poppins">
                  {isAuthenticated ? (
                    'Already have an account?'
                  ) : (
                    "Don't you have an account yet?"
                  )}{' '}
                  <Anchor to="/register">Regístrate aquí</Anchor>.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <RegisterModal showModal={showModal} handleClose={handleModalClose} userData={userData} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
