const initialState = {
  posts: [],
  loading: false,
  error: null,
  // Otros estados iniciales...
};


const ReducerPosts = (state = initialState, action) => {
  switch (action.type) {
    case 'POSTS_REQUEST':
      console.log('Reducer: POSTS_REQUEST');
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'POSTS_SUCCESS':
      console.log('Reducer: POSTS_SUCCESS');
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case 'POSTS_FAILURE':
      console.log('Reducer: POSTS_FAILURE');
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Otros casos...
    default:
      return state;
  }
};

export default ReducerPosts;