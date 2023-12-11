import { config } from "dotenv";

config();

export const env = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: "mongodb+srv://db_myDestiny:GeChrcav5qAutxib@cluster0.i7mmaur.mongodb.net/"
};

