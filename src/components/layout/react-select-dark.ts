export const darkThemeStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2A2A2A',
      color: 'white',
      borderColor: '#666',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2A2A2A',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#333' : '#2A2A2A',
      color: 'white',
      '&:hover': {
        backgroundColor: '#333',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#333',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      '&:hover': {
        backgroundColor: '#555',
        color: 'white',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ccc',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };