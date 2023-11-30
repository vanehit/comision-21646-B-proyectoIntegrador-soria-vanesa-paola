import React from 'react';
import PostCard from './PostCard';

const PostCardsContainer = ({ posts }) => {
  return (
    <div className="post-cards-container">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostCardsContainer;
