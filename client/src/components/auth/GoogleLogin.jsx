import * as api from '../../api';
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSuccess = async ({ code }) => {
    const tokens = await api.getTokens(code).then(res => res.data.tokens);
    const result = await api.decodeAccessToken({ token: tokens.access_token }).then(res => res.data);
    const token = tokens.id_token;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => console.log("Google Sign In was unsuccessful. Try Again Later", error);

  const login = useGoogleLogin({
    onSuccess: googleSuccess,
    flow: 'auth-code',
    onError: googleError
  });

  return (
    <button 
      type="button"
      onClick={() => login()}
      className="flex gap-[68px] items-center px-4 py-1.5 outline outline-1 outline-gray-300 rounded-sm hover:bg-blue-100/50 hover:outline-blue-200"
    >
      <img 
        src="/svgs/google.svg" 
        alt="google" 
        className="w-5 h-5"
      />
      <span className="text-sm">SIGN IN WITH GOOGLE</span>
    </button>
  );
};

export default GoogleLogin;
