import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar, Home, PostDetails } from './components';
import Auth from "./components/auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const NavigateToPosts = () => <Navigate to="/posts" />;

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" Component={NavigateToPosts} />
          <Route path="/posts" Component={Home} />
          <Route path="/posts/search" Component={Home} />
          <Route path="/posts/:id" Component={PostDetails} />
          <Route path="/auth" Component={!user ? Auth : NavigateToPosts} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
