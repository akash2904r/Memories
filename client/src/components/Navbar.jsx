import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode as decode } from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <nav className='flex justify-between py-1.5 px-4 sm:px-8 lg:px-16 xl:px-20 items-center bg-white w-[90%] mx-auto my-3 shadow-md rounded-lg'>
      <Link to="/">
        <div className='flex gap-1 justify-center'>
          <div className='text-[#6a6464] text-4xl font-semibold font-fjella-one max-sm:text-3xl'>
            M<span className='text-3xl tracking-wide max-sm:text-2xl'>EMORIES</span>
          </div>
          <img
            src="/memories.jpg"
            alt="Memories"
            className='w-10 h-10 max-sm:w-[34px] max-sm:h-[34px]'
          />
        </div>
      </Link>

      {user?.result ? (
        <div className='flex items-center gap-2'>
          {user?.result.picture ? (
            <img src={user?.result.picture} alt={user?.result.name} className='text-xs h-8 w-8 rounded-full max-sm:w-7 max-sm:h-7' />
          ) : (
            <span className='bg-purple-400 w-8 h-8 py-2.5 text-xl leading-[10px] text-center text-white font-normal rounded-full'>
              {user?.result?.name?.trim().charAt(0)}
            </span>
          )}
          <h5 className='text-sm'>{user?.result.name}</h5>
          <button
            className='bg-[#da1a43] text-white text-xs px-3 py-1.5 ml-3 xl:ml-6 rounded-[4px]'
            onClick={logout}
          >
            LOGOUT
          </button>
        </div>
      ) : (
        <Link to="/auth">
          <button className='bg-blue-800 text-white text-xs px-3 py-2 rounded-[4px]'>SIGN IN</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
