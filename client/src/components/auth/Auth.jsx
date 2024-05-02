import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import { initialForm, initialPassword, authList } from "../../constants";
import GoogleLogin from "./GoogleLogin";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(initialPassword);
  const [inputs, setInputs] = useState(authList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchMode = () => {
    setFormData(initialForm);
    setIsSignUp(prevState => !prevState);
    setShowPassword(initialPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignUp) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  };

  return (
    <div className="w-96 max-[400px]:w-[330px] shadow-2xl rounded-lg bg-white p-5 mb-5 mx-auto">
      <div className="mx-auto bg-pink-600 w-fit rounded-full">
        <img 
          src="/svgs/lock.svg" 
          alt="lock" 
          className="h-12 w-12 p-3"
        />
      </div>
      <h2 className="text-2xl font-[600] text-center pb-5">Sign {isSignUp ? 'Up' : 'In'}</h2>

      <form 
        action="http://localhost:3000/users"
        method='POST' 
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {isSignUp && (
          <div className="flex gap-5">
            <Input placeholder="First Name *" name="firstName" handleChange={handleChange} inputs={inputs} setInputs={setInputs} />
            <Input placeholder="Last Name *" name="lastName" handleChange={handleChange} inputs={inputs} setInputs={setInputs} />
          </div>
        )}

        <Input type="email" placeholder="Email Address *" name="email" handleChange={handleChange} inputs={inputs} setInputs={setInputs} />
        <Input type={showPassword.password ? "text" : "password"} placeholder="Password *" name="password" handleChange={handleChange} showPassword={showPassword.password} setShowPassword={setShowPassword} inputs={inputs} setInputs={setInputs} />

        {isSignUp && (
          <Input type={showPassword.confirmPassword ? "text" : "password"} placeholder="Confirm Password *" name="confirmPassword" handleChange={handleChange} showPassword={showPassword.confirmPassword} setShowPassword={setShowPassword} inputs={inputs} setInputs={setInputs} />
        )}

        <button type="submit" className="bg-blue-800 text-white text-sm px-3 py-1.5 rounded-[4px]" onClick={handleSubmit}>SIGN {isSignUp ? 'UP' : 'IN'}</button>

        <div className="relative my-1.5">
          <hr className="border-[#d1d5db]" />
          <span className="bg-white px-2 absolute -top-3.5 right-[45%]">or</span>
        </div>
        
        <GoogleLogin />
      </form>

      <div className="text-end mt-5">
        <button className="text-xs" onClick={switchMode}>{isSignUp ? "ALREADY" : "DON'T"} HAVE AN ACCOUNT? <span className="text-blue-800 underline font-medium">SIGN {isSignUp ? "IN" : "UP"}</span></button>
      </div>
    </div>
  );
};

export default Auth;
