// postsReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Puedes agregar otras acciones según sea necesario
  },
});

export const {
  postsRequest,
  postsSuccess,
  postsFailure,
  // Agrega otras acciones según sea necesario
} = postsSlice.actions;

export default postsSlice.reducer;
