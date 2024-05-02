import { handleFocus, handleBlur, checkFocus } from '../utils';

const Input = ({ name, placeholder, state, setState, inputs, setInputs, handleKeyPress }) => {
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if(name == 'tags') {
      setState({ ...state, [name]: value.split(',') });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  return (
    <div className={`relative ${name == 'message' && 'h-[116px]'}`}>
      {name == 'message' 
        ? (
          <textarea
            rows="4"
            name={name}
            required
            value={state.message}
            placeholder={placeholder}
            className={`w-full outline outline-1 px-4 py-2.5 text-base rounded-sm resize-none
              ${ checkFocus(name, inputs) 
                ? 'placeholder:opacity-0 outline-black' 
                : 'outline-gray-400' }`
            }
            onFocus={(e) => handleFocus(e, inputs, setInputs)}
            onBlur={(e) => handleBlur(e, inputs, setInputs)}
            onChange={handleChange}
          />
        ) 
      : (
        <input
          type="text"
          name={name}
          required
          value={name == 'title' ? state.title : state.tags}
          placeholder={placeholder}
          className={`w-full outline outline-1 px-4 py-2.5 text-base rounded-sm
            ${ checkFocus(name, inputs) 
              ? 'placeholder:opacity-0 outline-black' 
              : 'outline-gray-400' }`
          }
          onFocus={(e) => handleFocus(e, inputs, setInputs)}
          onBlur={(e) => handleBlur(e, inputs, setInputs)}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      )}
      <span className={`absolute left-2 text-[11px] text-gray-600 bg-white px-1 duration-200 ease-in-out opacity-0 transition-all 
        ${ checkFocus(name, inputs) 
          ? 'opacity-100 -translate-y-[9px]' 
          : '-translate-y-4' }`
      }>
        {placeholder}
      </span>
    </div>
  );
};

export default Input;
