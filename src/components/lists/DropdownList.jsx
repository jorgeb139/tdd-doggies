export const DropdownList = ({breeds, onBreedChange, onSubBreedChange}) => {
  
  const handleChange = (e) => {
    if (onBreedChange) {
      onBreedChange(e.target.value);
    }else if (onSubBreedChange){
      onSubBreedChange(e.target.value);
    }
  };

  return (
    <select onChange={handleChange}>
      {breeds.map((breed, index) => (
        <option key={index} value={breed}>
          {breed}
        </option>
      ))}
    </select>
  )
}
