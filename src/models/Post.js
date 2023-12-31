import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: mongoose.Schema.Types.ObjectId,
  comments: [mongoose.Schema.Types.ObjectId],
  imageURL: String,
  cities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  }],
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
