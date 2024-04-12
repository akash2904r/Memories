import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { inputList } from '../constants/index';
import { createPost, updatePost } from '../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [inputs, setInputs] = useState(inputList);
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', imgURL: '' });
  const dispatch = useDispatch();
  const post = useSelector(state => currentId ? state.posts.find(post => post._id == currentId) : null);

  useEffect(() => {
    if(post) {
      setPostData(post);
      setInputs(inputList.map(input => ({ ...input, isFocused: true })));
    }
  }, [post]);

  const handleFocus = (e) => {
    let name = e.target.placeholder;

    let newInputs = inputs.map((input) => ({
      ...input, isFocused: (input.name == name ? true : input.isFocused)
    }));

    setInputs(newInputs);
  }

  const handleBlur = (e) => {
    let value = e.target.value;
    let name = e.target.placeholder;

    let newInputs = inputs.map((input) => ({
      ...input, isFocused: ((input.name == name && value == '') ? false : input.isFocused)
    }));

    setInputs(newInputs);
  }

  const checkFocus = (input) => {
    let name = input;
    let res;

    inputs.forEach(input => {
      if(input.name == name)
        res = input.isFocused;
    });

    return res;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clear();
    setInputs(inputList);
  }

  const clear = () => {
    setPostData({ creator: '', title: '', message: '', tags: '', imgURL: '' });
    setCurrentId(null);
    setInputs(inputList);
  }

  return (
    <div className='flex justify-center lg:absolute lg:right-[8%]'>
      <div className='w-80 shadow-2xl rounded-lg bg-white mb-10'>
        <h3 className='font-medium text-2xl sm:text-xl text-center py-3'>{currentId ? 'Editing' : 'Creating'} a Memory</h3>
        <form
          id='postForm'
          action="http://localhost:3000/posts"
          method='POST'
          className='flex flex-col gap-3'
          onSubmit={handleSubmit}
        >
          <div className='mx-5 relative'>
            <input
              type="text"
              name='creator'
              placeholder='Creator'
              value={postData.creator}
              className={`w-full outline outline-1 px-4 py-2 max-sm:py-2.5 text-base rounded-sm ${checkFocus('Creator') ? 'placeholder:opacity-0 outline-black' : 'outline-gray-400'}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
            />
            <span className={`absolute left-2 text-xs text-gray-600 bg-white px-1 duration-200 ease-in-out opacity-0 transition-all ${checkFocus('Creator') ? 'opacity-100 -translate-y-2.5' : '-translate-y-4'}`}>Creator</span>
          </div>
          <div className='mx-5 relative'>
            <input
              type="text"
              name='title'
              placeholder='Title'
              value={postData.title}
              className={`w-full outline outline-1 px-4 py-2 max-sm:py-2.5 text-base rounded-sm ${checkFocus('Title') ? 'placeholder:opacity-0 outline-black' : 'outline-gray-400'}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
            <span className={`absolute left-2 text-xs text-gray-600 bg-white px-1 duration-200 ease-in-out opacity-0 transition-all ${checkFocus('Title') ? 'opacity-100 -translate-y-2.5' : '-translate-y-4'}`}>Title</span>
          </div>
          <div className='mx-5 relative'>
            <input
              type="text"
              name='message'
              placeholder='Message'
              value={postData.message}
              className={`w-full outline outline-1 px-4 py-2 max-sm:py-2.5 text-base rounded-sm ${checkFocus('Message') ? 'placeholder:opacity-0 outline-black' : 'outline-gray-400'}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setPostData({ ...postData, message: e.target.value })}
            />
            <span className={`absolute left-2 text-xs text-gray-600 bg-white px-1 duration-200 ease-in-out opacity-0 transition-all ${checkFocus('Message') ? 'opacity-100 -translate-y-2.5' : '-translate-y-4'}`}>Message</span>
          </div>
          <div className='mx-5 relative'>
            <input
              type="text"
              name='tags'
              placeholder='Tags'
              value={postData.tags}
              className={`w-full outline outline-1 px-4 py-2 max-sm:py-2.5 text-base rounded-sm ${checkFocus('Tags') ? 'placeholder:opacity-0 outline-black' : 'outline-gray-400'}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
            />
            <span className={`absolute left-2 text-xs text-gray-600 bg-white px-1 duration-200 ease-in-out opacity-0 transition-all ${checkFocus('Tags') ? 'opacity-100 -translate-y-2.5' : '-translate-y-4'}`}>Tags</span>
          </div>
          <div className="mx-5 font-[600] text-xs">
            <FileBase 
              type="file" 
              multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, imgURL: base64 })} 
            />
          </div>

          <div className='buttons flex flex-col mx-5 gap-2 pb-3'>
            <button type='submit' className='bg-blue-700 text-white py-1.5 rounded-md hover:font-medium hover:bg-blue-800'>SUBMIT</button>
            <button type='reset' className='bg-red-700 text-white py-1 rounded-md hover:font-medium hover:bg-red-800' onClick={clear}>CLEAR</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form;
