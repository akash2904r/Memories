import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Form, Posts, Pagination, SearchField } from './';
import { initialSearchBarData } from "../constants";

function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState(initialSearchBarData);
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <div className="flex justify-between pt-3 mb-10 min-[960px]:mx-14 lg:mx-24 xl:mx-20 max-[960px]:flex-col-reverse">
      <Posts setCurrentId={setCurrentId} />
      <div className='flex flex-col gap-5 mb-10'>
        {user && (
          <SearchField search={search} setSearch={setSearch} />
        )}
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        {(!searchQuery && !search.tags.length) && (
          <Pagination page={page} />
        )}
      </div>
    </div>
  );
};

export default Home;
