import { handleFocus, handleBlur, checkFocus } from "../../utils";

const Input = ({ type, name, placeholder, handleChange, showPassword, setShowPassword, inputs, setInputs }) => {
  const handleShow = () => {
    if(name == 'password') {
      setShowPassword(prevState => ({ ...prevState, password: !prevState.password }));
    } else {
      setShowPassword(prevState => ({ ...prevState, confirmPassword: !prevState.confirmPassword }));
    }
  };

  return (
    <div className="relative">
      <input 
        type={type || 'text'} 
        name={name}
        placeholder={placeholder}
        required 
        className={`w-full outline outline-1 px-4 py-2.5 rounded-sm 
          ${ checkFocus(name, inputs) 
            ? 'placeholder:opacity-0 outline-black' 
            : 'outline-gray-400' }`
        } 
        onFocus={(e) => handleFocus(e, inputs, setInputs)}
        onBlur={(e) => handleBlur(e, inputs, setInputs)}
        onChange={handleChange}
      />
      <span className={`absolute left-2 text-xs text-gray-600 bg-white px-1 duration-200 ease-in-out opacity-0 transition-all 
        ${ checkFocus(name, inputs) 
          ? 'opacity-100 -translate-y-2.5' 
          : '-translate-y-4' }`
      }>
        {placeholder}
      </span>

      {name.includes('word') && (
        <span htmlFor={name} className="absolute right-2 bottom-[13px]" onClick={handleShow}>
          <img 
            src={showPassword ? "/svgs/hide.svg" : "/svgs/show.svg"} 
            alt={showPassword ? "hide" : "show"} 
            className="h-5 w-5"
          />
        </span>
      )}
    </div>
  );
};

export default Input;
