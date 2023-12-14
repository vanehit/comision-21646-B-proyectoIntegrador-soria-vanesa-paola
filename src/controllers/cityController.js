import City from '../models/City.js';
import Post from '../models/Post.js';

export const getAllCitiesWithPosts = async (req, res) => {
  try {
    const cities = await City.find().populate('posts');
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error al obtener ciudades con posts:', error);
    res.status(500).json({ error: 'Error al obtener ciudades con posts' });
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error en getCities:', error);
    res.status(500).json({ error: 'Error al obtener las ciudades.' });
  }
};

export const createCity = async (req, res) => {
  try {
    const newCity = await City.create(req.body);
    res.status(201).json(newCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la ciudad.' });
  }
};

export const getCityById = async (req, res) => {
  const cityId = req.params.cityId;
  try {
    const city = await City.findById(cityId);
    if (!city) {
      res.status(404).json({ error: 'Ciudad no encontrada.' });
    } else {
      res.status(200).json(city);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la ciudad.' });
  }
};

export const updateCity = async (req, res) => {
  const cityId = req.params.cityId;
  try {
    const updatedCity = await City.findByIdAndUpdate(cityId, req.body, { new: true });
    if (!updatedCity) {
      res.status(404).json({ error: 'Ciudad no encontrada.' });
    } else {
      res.status(200).json(updatedCity);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la ciudad.' });
  }
};

export const deleteCity = async (req, res) => {
  const cityId = req.params.cityId;
  try {
    const deletedCity = await City.findByIdAndDelete(cityId);
    if (!deletedCity) {
      res.status(404).json({ error: 'Ciudad no encontrada.' });
    } else {
      res.status(200).json(deletedCity);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la ciudad.' });
  }
};
