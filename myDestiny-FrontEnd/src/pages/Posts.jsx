import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/actions/postAction';
import Loader from '../components/Loader';
import HeaderPosts from '../components/HeaderPosts';
import PostCardsContainer from '../components/PostCardsContainer';

const Posts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const posts = postsState.posts;
  const loading = postsState.loading;
  const error = postsState.error;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-light">
        <HeaderPosts />
        <div className="container-posts">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light">
        <HeaderPosts />
        <div className="container-posts">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light">
      <HeaderPosts />
      <div className="container-posts">
      <div className="post-cards-container">
        {posts.map((post) => (
        <PostCardsContainer key={post._id} posts={[post]} />
      ))}
      </div>
      </div>
    </div>
  );
};

export default Posts;
