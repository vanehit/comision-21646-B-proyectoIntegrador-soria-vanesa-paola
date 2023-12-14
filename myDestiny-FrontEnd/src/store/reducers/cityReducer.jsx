import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cities: [],
  loading: false,
  error: null,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    citiesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    citiesSuccess: (state, action) => {
      state.loading = false;
      state.cities = action.payload;
    },
    citiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  citiesRequest,
  citiesSuccess,
  citiesFailure,
} = citiesSlice.actions;

export default citiesSlice.reducer;
