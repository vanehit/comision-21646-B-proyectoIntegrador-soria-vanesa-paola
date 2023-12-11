// postAction.jsx
import axios from 'axios';
import { postsRequest, postsSuccess, postsFailure } from '../reducers/postReducer';

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(postsRequest());

    try {
      const response = await axios.get('http://localhost:3000/posts');
      dispatch(postsSuccess(response.data.posts));
    } catch (error) {
      console.error('Error fetching posts:', error);
      dispatch(postsFailure('Error al cargar las publicaciones. Inténtalo de nuevo más tarde.'));
    }
  };
};
