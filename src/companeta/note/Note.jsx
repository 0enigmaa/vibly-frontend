import React from 'react';
import Post from '../post/Post';
import { useInfoContext } from '../../context/context';

const Note = () => {
  const { currentUser, allPost } = useInfoContext();

  // Filter allPost to get only saved posts
  const savedPosts = allPost.filter((post) =>
    currentUser.savedPosts.includes(post._id)
  );

  return (
    <div>
      <h1 className='mt-3'>Saved Posts ({savedPosts.length})</h1>

      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      ) : (
        <p>No saved posts yet.</p>
      )}
    </div>
  );
};

export default Note;
