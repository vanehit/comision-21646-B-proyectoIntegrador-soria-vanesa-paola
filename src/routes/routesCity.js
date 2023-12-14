import express from 'express';
import {
  getCities,
  createCity,
  getCityById,
  updateCity,
  deleteCity,
  getAllCitiesWithPosts,
} from '../controllers/cityController.js';

const cityRouter = express.Router();

cityRouter.get('/', getCities);
cityRouter.get('/all', getAllCitiesWithPosts);
cityRouter.post('/create', createCity);
cityRouter.get('/:cityId', getCityById);
cityRouter.put('/update/:cityId', updateCity);
cityRouter.delete('/delete/:cityId', deleteCity);

export default cityRouter;
