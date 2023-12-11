import axios from 'axios';
import { registerRequest, registerSuccess, registerFailure } from '../reducers/authReducer';

export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest());

    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);

      if (response.ok) {
        dispatch(registerSuccess(response.data.user));
      } else {
        const data = await response.json();
        dispatch(registerFailure(data.error));
      }
    } catch (error) {
      console.error('Error during registration:', error);
      dispatch(registerFailure('Error during registration. Please try again later.'));
    }
  };
};
