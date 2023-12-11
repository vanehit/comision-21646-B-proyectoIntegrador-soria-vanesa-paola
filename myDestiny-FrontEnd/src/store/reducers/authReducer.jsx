import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Agrega otras acciones según sea necesario
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  // Agrega otras acciones según sea necesario
} = authSlice.actions;

export default authSlice.reducer;
