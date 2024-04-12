import { useSelector } from 'react-redux';

import Post from './Post';
import Loader from './Loader';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? (
      <div className='lg:w-[70%] xl:w-[75%] lg:min-h-[70vh] flex justify-center items-center'>
        <Loader />
      </div>
    ) : (
      <div className='grid grid-cols-1 posts-sm max-[560px]:posts-smaller min-[860px]:posts-md-lg lg:posts-lg xl:posts-xl'>
        {[...posts].reverse().map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
    )
  )
}

export default Posts;
