import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <div className='w-60 relative mx-auto mb-5 rounded-lg shadow-xl bg-white cursor-pointer'>
      <img src={post.imgURL} alt="Image" className='w-full h-36 object-cover rounded-t-lg' />
      <div className='text-white flex items-center justify-between absolute top-4 left-5 right-5'>
        <div className='flex flex-col'>
          <div className='text-sm font-medium'>{post.creator}</div>
          <p className='text-xs'>{moment(post.createdAt).fromNow()}</p>
        </div>
        <img 
          src="/svgs/three-dots.svg" 
          alt="Three dots" 
          className='h-6 w-6 rounded-full p-1 hover:bg-gray-400/60' 
          onClick={() => setCurrentId(post._id)}
        />
      </div>
      <div className='w-full h-44 px-2 py-3'>
        <div className='text-xs pb-2 truncate'>{post.tags.map(tag => `#${tag} `)}</div>
        <h4 className='font-bold text-2xl truncate pb-2'>{post.title}</h4>
        <p className='text-xs h-2/5 line-clamp-3 py-2.5'>{post.message}</p>
        <div className='flex justify-between text-[13px] mt-3'>
          <button className='flex gap-2 items-center' onClick={() => dispatch(likePost(post._id))}>
            <img 
              src={post.likeCount == 0 ? "/svgs/like.svg" : "/svgs/liked.svg"}
              alt="Like" 
              className='h-[22px] w-[22px]' 
            />
            <span className='text-[#1d2eaf]'>{post.likeCount} {post.likeCount == 0 ? "LIKE" : "LIKED"}</span>
          </button>
          <button className='flex gap-2 items-center' onClick={() => dispatch(deletePost(post._id))}>
            <img 
              src="/svgs/delete.svg" 
              alt="Delete" 
              className='h-5 w-5' 
            />
            <span className='text-[#1d2eaf]'>DELETE</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post;
