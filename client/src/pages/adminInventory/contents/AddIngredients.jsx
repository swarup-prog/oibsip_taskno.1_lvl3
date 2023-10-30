import { useState } from "react";
import { TextInput, CustomButton, TextArea } from "../../../components";

const AddIngredients = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-full">
      <section className="flex flex-col">
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Pizza Base
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
          <CustomButton title={"Add Pizza Base"} />
        </form>
      </section>
    </div>
  );
};

export default AddIngredients;
