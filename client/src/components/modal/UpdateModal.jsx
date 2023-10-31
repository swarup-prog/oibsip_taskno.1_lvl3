import { AiOutlineClose } from "react-icons/ai";
import { setIngredient } from "../../features/ingredientSlice";
import { useDispatch } from "react-redux";
import TextInput from "../inputFields/TextInput";
import CustomButton from "../buttons/CustomButton";
import { useEffect, useState } from "react";
import TextArea from "../inputFields/TextArea";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../utils/toast";
import { PostRequest } from "../../services/httpRequest";

const UpdateModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setIngredient({}));
  };

  const ingredient = useSelector((state) => state.selectedIngredient.data);

  console.log("Ingredients ", ingredient);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  useEffect(() => {
    setFormData({
      name: ingredient?.name,
      price: ingredient?.price,
      quantity: ingredient?.quantity,
      description: ingredient?.description,
    });
  }, [ingredient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PostRequest(
        `/inventory/updateIngredient/${ingredient._id}`,
        formData
      );
      if (response.status === 201) {
        toastSuccess(response.data.message);
        dispatch(setIngredient({}));
      }
      console.log("response", response);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute bg-gray-200 bg-opacity-80 z-40  flex items-center justify-center w-screen h-screen`}
    >
      <div className="relative shadow-md  rounded-lg w-1/2 h-auto bg-secondary px-8 py-8">
        <span
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handleClick}
        >
          <AiOutlineClose size={20} color="gray" />
        </span>
        <h1 className="text-xl font-medium mb-3 pb-2">Update Ingredient</h1>

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
          <TextInput
            type="number"
            name="quantity"
            label="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <TextArea
            name="description"
            label="Description (Optional)"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex justify-center mt-3">
            <CustomButton title="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
