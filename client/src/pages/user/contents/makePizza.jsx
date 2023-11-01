import { IngredientSetion } from "../../../components";

const MakePizza = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <IngredientSetion heading={"Pizza Base"} />
      <IngredientSetion heading={"Cheese"} />
      <IngredientSetion heading={"Sauce"} />
      <IngredientSetion heading={"Veggies"} />
      <IngredientSetion heading={"Meat"} />
    </div>
  );
};

export default MakePizza;
