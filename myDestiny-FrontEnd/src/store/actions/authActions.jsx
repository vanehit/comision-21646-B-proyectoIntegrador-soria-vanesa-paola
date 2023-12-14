import axios from 'axios';
import { registerRequest, registerSuccess, registerFailure, loginRequest, loginSuccess, loginFailure } from '../reducers/authReducer';


export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest());

    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);

      if (response.status === 200) {
        dispatch(registerSuccess(response.data.user));
      } else {
        const data = await response.json();
        if (response.status === 400 && data.error === 'Usuario ya registrado') {
          dispatch(registerFailure('El usuario ya está registrado. Por favor, elija otro nombre de usuario.'));
        } else {
          dispatch(registerFailure(data.error));
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      dispatch(registerFailure('Error during registration. Please try again later.'));
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post('http://localhost:3000/auth/login', userData);

      if (response.status === 200) {
        dispatch(loginSuccess(response.data.user));
      } else {
        const data = await response.json();
        dispatch(loginFailure(data.error));
      }
    } catch (error) {
      console.error('Error during login:', error);
      dispatch(loginFailure('Error during login. Please try again later.'));
    }
  };
};

