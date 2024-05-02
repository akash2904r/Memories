import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

import { inputList, intialPostData } from '../constants/index';
import { createPost, updatePost } from '../actions/posts';
import Input from './Input';

const Form = ({ currentId, setCurrentId }) => {
  const [inputs, setInputs] = useState(inputList);
  const [postData, setPostData] = useState(intialPostData);
  const dispatch = useDispatch();
  const post = useSelector(state => (currentId ? state.posts.posts.find(post => post._id == currentId) : null));
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  useEffect(() => {
    if(post) {
      setPostData(post);
      setInputs(inputList.map(input => ({ ...input, isFocused: true })));
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }

    clear();
    setInputs(inputList);
  };

  const clear = () => {
    setPostData(intialPostData);
    setCurrentId(null);
    setInputs(inputList);
  };

  if(!user?.result?.name) {
    return (
      <div className='w-80 flex justify-center bg-white p-5 shadow-2xl rounded-lg max-[960px]:mx-auto'>
        <h6 className='text-center my-5 font-bold text-lg text-red-600'>Please Sign in to create your own memories and like other's memories.</h6>
      </div>
    );
  }

  return (
    <div className='w-80 shadow-2xl rounded-lg bg-white px-5 max-[960px]:mx-auto'>
      <h3 className='font-medium text-2xl sm:text-xl text-center py-3'>{currentId ? 'Editing' : 'Creating'} a Memory</h3>
      <form
        action="http://localhost:3000/posts"
        method='POST'
        className='flex flex-col gap-3'
        onSubmit={handleSubmit}
      >
        <Input name="title" placeholder="Title *" state={postData} setState={setPostData} inputs={inputs} setInputs={setInputs} />
        <Input name="message" placeholder="Message *" state={postData} setState={setPostData} inputs={inputs} setInputs={setInputs} />
        <Input name="tags" placeholder="Tags (comma separated) *" state={postData} setState={setPostData} inputs={inputs} setInputs={setInputs} />

        <div className="font-[600] text-xs">
          <FileBase 
            type="file" 
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, imgURL: base64 })} 
          />
        </div>

        <div className='buttons flex flex-col gap-2 pb-3'>
          <button type='submit' className='bg-blue-700 text-white py-1 rounded-[3.5px] hover:font-medium hover:bg-blue-800'>SUBMIT</button>
          <button type='reset' className='bg-red-700 text-white py-0.5 rounded-[3.5px] hover:font-medium hover:bg-red-800' onClick={clear}>CLEAR</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
