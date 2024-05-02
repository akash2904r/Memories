export const handleFocus = (e, inputs, setInputs) => {
  let name = e.target.name;

  let newInputs = inputs.map((input) => ({
    ...input, isFocused: (input.name == name ? true : input.isFocused)
  }));

  setInputs(newInputs);
};

export const handleBlur = (e, inputs, setInputs) => {
  let value = e.target.value;
  let name = e.target.name;

  let newInputs = inputs.map((input) => ({
    ...input, isFocused: ((input.name == name && value == '') ? false : input.isFocused)
  }));

  setInputs(newInputs);
};

export const checkFocus = (iName, inputs) => {
  let res;

  inputs.forEach(input => {
    if(input.name == iName)
      res = input.isFocused;
  });

  return res;
};