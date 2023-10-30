import { IngredientForm } from "../../../components";

const AddIngredients = () => {
  return (
    <div className="flex flex-col w-full gap-10">
      <IngredientForm heading={"Pizza Base"} action={"Add Pizza Base"} />
      <IngredientForm heading={"Sauce"} action={"Add Sauce"} />
      <IngredientForm heading={"Cheese"} action={"Add Cheese"} />
    </div>
  );
};

export default AddIngredients;
