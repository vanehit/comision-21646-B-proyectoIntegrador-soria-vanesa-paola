import axios from 'axios';

export const fetchPosts = () => {
  return async (dispatch) => {
    console.log('Dispatching POSTS_REQUEST');
    dispatch({ type: 'POSTS_REQUEST' });

    try {
      const response = await axios.get('http://localhost:3000/posts');
      console.log('Dispatching POSTS_SUCCESS');
      dispatch({
        type: 'POSTS_SUCCESS',
        payload: response.data.posts,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      console.log('Dispatching POSTS_FAILURE');
      dispatch({
        type: 'POSTS_FAILURE',
        payload: 'Error al cargar los posts. Inténtalo de nuevo más tarde.',
      });
    }
  };
};
