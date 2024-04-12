import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from './actions/posts';
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <>
      <Navbar />
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      <Posts setCurrentId={setCurrentId} />
    </>
  );
}

export default App;
