import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  title: String,
  description: String,
  author: mongoose.Schema.Types.ObjectId,
  comments: [mongoose.Schema.Types.ObjectId],
  imageURL: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

const City = mongoose.model('City', citySchema);

export default City;
