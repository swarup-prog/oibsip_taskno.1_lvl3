import { useState } from "react";
import { TextInput, CustomButton, TextArea } from "../../components";

const IngredientForm = ({ heading, action }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const words = action.split(" ");
  const url = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
        {heading}
      </h1>
      <form action="" className="flex flex-col gap-5">
        <div className="flex gap-5">
          <TextInput
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            type="number"
            name="price"
            label="Price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <TextArea
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <CustomButton title={action} />
      </form>
    </div>
  );
};

export default IngredientForm;
