// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    
  },
  
});

export default store;
