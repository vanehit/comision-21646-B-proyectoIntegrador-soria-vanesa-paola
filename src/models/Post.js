//creamos el modelo Post
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  imageURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
