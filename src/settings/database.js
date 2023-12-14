// scripts/importData.js
import mongoose from 'mongoose';
import { env } from '../settings/envs.js';
import City from '../models/City.js';
import dataCities from '../dataCities.json' assert { type: 'json' };


export const startConnection = async () => {
  let db;
  try {
    // Conexión a la base de datos
    db = await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB is connected to ${db.connection.name}`);

    // Insertamos los datos del archivo JSON
    await City.insertMany(dataCities);
    console.log('Data imported successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  } 
};

