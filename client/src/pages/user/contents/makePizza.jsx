import { IngredientSetion } from "../../../components";

const MakePizza = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
        Custom Pizza
      </h1>
      <IngredientSetion heading={"Pizza Base"} />
      <IngredientSetion heading={"Cheese"} />
      <IngredientSetion heading={"Sauce"} />
      <IngredientSetion heading={"Veggies"} />
      <IngredientSetion heading={"Meat"} />
    </div>
  );
};

export default MakePizza;
