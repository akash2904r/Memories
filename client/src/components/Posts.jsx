import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

import { Post, Loader } from './';
import { getPosts } from '../actions/posts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;

  if(isDeleted) {
    dispatch(getPosts(page));

    setIsDeleted(false);
  }

  if(!posts.length && !isLoading) {
    return (
      <div className='w-[70%] flex justify-center items-center text-2xl text-red-600 font-bold'>No Posts Found...</div>
    );
  }

  return (
    isLoading ? (
      <div className='lg:w-[62%] xl:w-[66%] lg:min-h-[70vh] flex justify-center items-center'>
        <Loader />
      </div>
    ) : (
      <div className='grid grid-cols-1 posts-sm max-[560px]:posts-smaller md:posts-sm min-[800px]:posts-md-sm min-[960px]:posts-md-lg xl:posts-xl'>
        {posts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} setIsDeleted={setIsDeleted} />
        ))}
      </div>
    )
  );
};

export default Posts;
