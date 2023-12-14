import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import createPostValidation from '../validations/createPostValidation.js';
import updatePostValidation from '../validations/updatePostValidation.js';

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.post('/create', createPostValidation, createPost);
postRouter.put('/update/:postId', updatePostValidation, updatePost);
postRouter.delete('/delete/:postId', deletePost);

export default postRouter;
