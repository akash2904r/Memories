import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deletePost, likePost } from '../actions/posts';
import { defaultImgURL } from '../constants';

const Post = ({ post, setCurrentId, setIsDeleted }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const isCreator = user?.result?.sub === post?.creator || user?.result?._id === post?.creator;

  const Likes = () => {
    const len = post.likes.length;
    const isLiked = post.likes.find(like => like == (user?.result?._id || user?.result?.sub));

    return (
      <>
        <img 
          src={!user?.result 
            ? "/svgs/disabledLike.svg" 
            : isLiked ? "/svgs/liked.svg" : "/svgs/like.svg"
          }
          alt="Like" 
          className='h-[22px] w-[22px]' 
        />
        <span className={`text-xs ${!user?.result ? 'text-[#808080]' : 'text-[#1d2eaf]'}`}>
          { len > 2 
            ? !user?.result 
              ? `${len} LIKES`
              : `You and ${len - 1} others`
            : len == 0 
                ? !user?.result ? '' : 'LIKE' 
                : len > 1 ? `${len} LIKES` : `${len} LIKE` }
        </span>
      </>
    );
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setCurrentId(post._id);
  };

  const displayPost = () => navigate(`/posts/${post._id}`);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    setIsDeleted(true);
  };

  return (
    <div className='w-60 h-fit relative mx-auto rounded-lg shadow-2xl bg-white'>
      <div className='cursor-pointer' onClick={displayPost}>
        <img src={post.imgURL || defaultImgURL} alt={post.title} className='w-full h-36 object-cover rounded-t-lg' />
        <div className='text-white flex items-center justify-between absolute top-4 left-5 right-5'>
          <div className='flex flex-col'>
            <div className='text-sm font-medium'>{post.name}</div>
            <p className='text-xs'>{moment(post.createdAt).fromNow()}</p>
          </div>

          {isCreator && (
            <button 
              className='hover:bg-gray-400/60 rounded-full'
              onClick={handleEdit}
            >
              <img 
                src="/svgs/three-dots.svg" 
                alt="Three dots" 
                className='h-6 w-6 p-1' 
              />
            </button>
          )}
        </div>
        <div className='w-full h-36 px-2 pt-3'>
          <div className='text-xs pb-2 truncate'>{post.tags.map(tag => `#${tag} `)}</div>
          <h4 className='font-bold text-2xl truncate pb-2'>{post.title}</h4>
          <p className='text-xs h-[45%] line-clamp-3 pt-2.5'>{post.message}</p>
        </div>
      </div>
      <div className='flex justify-between text-[13px] mb-2 mt-0.5 mx-2.5'>
        <button 
          className='flex gap-1.5 items-center' 
          onClick={() => dispatch(likePost(post._id))}
          disabled={!user?.result}
        >
          <Likes />
        </button>
        
        {isCreator && (
          <button className='flex gap-1 items-center' onClick={() => handleDelete(post._id)}>
            <img 
              src="/svgs/delete.svg" 
              alt="Delete" 
              className='h-5 w-5' 
            />
            <span className='text-[#1d2eaf]'>DELETE</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
