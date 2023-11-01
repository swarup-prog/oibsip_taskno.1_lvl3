import { IngredientCard } from "../../../components";
import { useSelector } from "react-redux";

const MakePizza = () => {
  const ingredients = useSelector((state) => state.inventory.data);

  const pizzaBaseCards = ingredients
    .filter((ingredient) => ingredient.type === "pizzaBase")
    .map((ingredient) => {
      return (
        <IngredientCard
          key={ingredient._id}
          ingredient={ingredient}
          isSelected={false}
        />
      );
    });

  return (
    <div className="flex flex-col gap-6 w-full">
      <section>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Pizza Base
        </h1>
        <div className="flex gap-2 flex-wrap justify-center h-[348px] overflow-y-auto">
          {pizzaBaseCards}
        </div>
      </section>
    </div>
  );
};

export default MakePizza;
