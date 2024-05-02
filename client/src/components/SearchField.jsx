import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "./Input";
import { searchBarList } from "../constants";
import { getPostsBySearch } from "../actions/posts";

const SearchField = ({ search, setSearch }) => {
  const [inputs, setInputs] = useState(searchBarList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    const tags = search.tags.length ? search.tags.join(',') : 'none';

    if(search.title.trim() || search.tags) {
      dispatch(getPostsBySearch({ search: search.title, tags }));

      console.log(tags)

      navigate(`/posts/search?searchQuery=${search.title || 'none'}&tags=${!(tags === 'none') ? tags.join(',') : tags}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col gap-2.5 w-80 h-fit max-lg:mx-auto bg-white px-4 py-3 pt-4 rounded-md shadow-2xl">
      <Input placeholder="Search Memories" name="title" state={search} setState={setSearch} inputs={inputs} setInputs={setInputs} handleKeyPress={handleKeyPress} />
      <Input placeholder="Search Tags" name="tags" state={search} setState={setSearch} inputs={inputs} setInputs={setInputs} />
      <button className='bg-blue-700 text-white py-[5px] rounded-[3.5px] hover:font-medium text-sm hover:bg-blue-800' onClick={searchPost}>SEARCH</button>
    </div>
  );
};

export default SearchField;
