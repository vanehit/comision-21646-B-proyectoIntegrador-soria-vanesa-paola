// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postReducer';
import cityReducer from './reducers/cityReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    cities: cityReducer,
    
  },
  
});

export default store;
