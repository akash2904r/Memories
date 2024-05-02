import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { Loader, CommentSection } from './';
import { getPost, getPostsBySearch } from '../actions/posts';
import { defaultImgURL } from '../constants';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if(!post) return null;

  if(isLoading) {
    return (
      <div className='w-full h-[75vh] flex justify-center items-center'>
        <Loader />
      </div>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const displayPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <div className='w-[90%] p-5 mx-auto mb-5 bg-white shadow-2xl rounded-lg'>
      <div className='flex gap-5 max-lg:flex-col-reverse'>
        <section className='w-[55%] min-h-80 max-lg:w-full'>
          <h1 className='text-4xl font-semibold font-quicksand tracking-tight'>{post.title}</h1>
          <div className='text-lg text-[#a49c9c] py-0.5'>{post.tags.map(tag => `#${tag} `)}</div>
          <p className='py-1.5 tracking-tight text-[15px]'>{post.message}</p>
          <div className='text-lg'>Created by: {post.name}</div>
          <div className='text-sm'>{moment(post.createdAt).fromNow()}</div>

          <hr className='my-5' />

          <CommentSection post={post} />
        </section>
        <section className={`w-[45%] flex justify-center items-center rounded-lg box-border max-lg:mx-auto max-lg:w-[65%] max-sm:w-[98%] ${!post.imgURL && 'h-80 bg-[#d9d9d9]'}`}>
          <img src={post.imgURL || defaultImgURL} alt={post.title} className='max-w-full h-auto rounded-lg' />
        </section>
      </div>

      <hr className='mt-4 mb-10' />

      {!!recommendedPosts.length && (
        <div>
          <h4 className='text-xl'>You might also like:</h4>
          <hr className='my-1.5' />
          <ul className='recommended-posts-ul flex gap-5 pt-3 pb-8 px-3 overflow-x-auto'>
            {recommendedPosts.map(post => (
              <li 
                key={post._id} 
                className='cursor-pointer min-w-[271px]' 
                onClick={() => displayPost(post._id)}
              >
                <h6 className='font-medium pb-1.5'>{post.title}</h6>
                <div className='text-xs text-[#868181] tracking-tight pb-1'>{post.name}</div>
                <p className='text-xs tracking-tight pb-1 line-clamp-4'>{post.message}</p>
                <div className='text-sm pb-1.5'>Likes: {post.likes.length}</div>
                <img src={post.imgURL || defaultImgURL} alt={post.title} className='w-[150px]' />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
