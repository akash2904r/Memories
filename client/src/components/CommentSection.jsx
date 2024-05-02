import { useState } from 'react'
import { useDispatch } from 'react-redux';

import { commentPost } from '../actions/posts';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([...post?.comments].reverse());
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    const finalComment = {
      picture: user?.result?.picture || 'NIL',
      name: user?.result?.name,
      comment
    }

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments([...newComments].reverse());
    setComment('');
  };

  return (
    <>
      <h3 className='text-lg pb-2'>Comments</h3>

      {user?.result?.name && (
        <div className='flex items-center gap-3'>
          <div className='relative w-full'>
            <input
              row="4"
              name="comment"
              value={comment}
              placeholder="Write a comment..."
              className={`w-full px-4 py-1.5 text-base rounded-sm resize-none outline outline-1 ${(isFocused || comment != '')
                ? 'placeholder:opacity-0 outline-black'
                : 'outline-gray-400'}`
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setComment(e.target.value)}
            />
            <span className={`absolute left-2 text-[11px] text-gray-600 bg-white px-1 duration-200 ease-in-out opacity-0 transition-all ${(isFocused || comment != '') ? 'opacity-100 -translate-y-[9px]' : '-translate-y-4'}`}
            >
              Comment
            </span>
          </div>
          <button className={`p-1 pl-2.5 rounded-full ${comment != '' ? 'hover:bg-gray-200' : 'pointer-events-none'}`} onClick={handleClick}>
            <img
              src={comment == '' ? '/svgs/disabled-comment.svg' : '/svgs/comment.svg'}
              alt={comment == '' ? 'disabled-comment' : 'comment'}
              className='w-9 h-9'
            />
          </button>
        </div>
      )}

      {!comments.length ? (
        <span className='text-sm font-semibold'>No comments to display</span>
      ) : (
        <ul className={`comments-container py-4 flex flex-col gap-4 overflow-y-auto ${comments.length > 1 ? 'h-[127px]' : 'h-fit'}`}>
          {comments.map((comment, i) => (
            <li key={i} className='flex gap-3 pointer-events-none'>
              {comment.picture != "NIL" ? (
                <img src={comment.picture} alt={comment.name} className='text-xs h-9 w-9 rounded-full' />
              ) : (
                <span className='bg-purple-400 w-9 h-9 py-2.5 text-xl leading-3 text-center text-white font-normal rounded-full'>
                  {comment.name?.trim().charAt(0)}
                </span>
              )}
              <div className='font-quicksand'>
                <h6 className='text-[13px] font-semibold'>{comment.name}</h6>
                <p className='text-sm'>{comment.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentSection;
