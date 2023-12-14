import axios from 'axios';
import { citiesRequest, citiesSuccess, citiesFailure } from '../reducers/cityReducer.jsx';

export const fetchCities = () => {
  return async (dispatch) => {
    dispatch(citiesRequest());

    try {
      const response = await axios.get('http://localhost:3000/cities');
      dispatch(citiesSuccess(response.data));
    } catch (error) {
      console.error('Error fetching cities:', error);
      dispatch(citiesFailure('Error al cargar las ciudades. Inténtalo de nuevo más tarde.'));
    }
  };
};
