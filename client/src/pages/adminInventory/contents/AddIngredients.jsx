import { useState } from "react";
import {
  TextInput,
  CustomButton,
  TextArea,
  ItemsDropdown,
} from "../../../components";
import { toastSuccess, toastError } from "../../../utils/toast";
import { PostRequest } from "../../../services/httpRequest";

const AddIngredients = () => {
  const ingredientTypes = [
    {
      id: "1",
      label: "Pizza Base",
      value: "pizzaBase",
    },
    {
      id: "2",
      label: "Cheese",
      value: "cheese",
    },
    {
      id: "3",
      label: "Sauce",
      value: "sauce",
    },
    {
      id: "4",
      label: "Veggies",
      value: "veggies",
    },
    {
      id: "5",
      label: "Meat",
      value: "meat",
    },
  ];

  const temp = ingredientTypes.find((ext) => ext.value);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "pizzaBase",
    quantity: "",
    description: "",
  });

  const [currentExtension, setCurrentExtension] = useState(temp);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await PostRequest("/inventory/addIngredient", formData);
      if (response.status === 201) {
        toastSuccess(response.data.message);
        setFormData({
          name: "",
          price: "",
          type: "pizzaBase",
          quantity: "",
          description: "",
        });
        setCurrentExtension(ingredientTypes[0]);
      }
      console.log("response", response);
    } catch (error) {
      console.log(error);
      toastError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col w-full gap-10 items-center">
      <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
        Add Ingredients
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
        <div className="flex gap-5 items-center">
          <TextInput
            type="number"
            name="quantity"
            label="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <ItemsDropdown
            options={ingredientTypes}
            value={currentExtension}
            onChange={(event) => {
              setCurrentExtension(event);
              setFormData({ ...formData, type: event.value });
            }}
          />
          <span>{formData.type}</span>
        </div>
        <TextArea
          name="description"
          label="Description (Optional)"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex justify-center mt-3">
          <CustomButton title="Add Ingredient" />
        </div>
      </form>
    </div>
  );
};

export default AddIngredients;
