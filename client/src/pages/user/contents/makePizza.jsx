import { IngredientCard } from "../../../components";
import { useSelector } from "react-redux";

const MakePizza = () => {
  const ingredients = useSelector((state) => state.inventory.data);

  return (
    <div className="flex flex-col gap-6 w-full">
      <section>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Pizza Base
        </h1>
        <div className="flex gap-2 flex-wrap justify-center h-[355px] overflow-y-auto pb-2 scrollbar-thin  scrollbar-track-transparent">
          {ingredients
            .filter((ingredient) => ingredient.type === "pizzaBase")
            .map((ingredient) => {
              return (
                <IngredientCard
                  key={ingredient._id}
                  ingredient={ingredient}
                  isSelected={false}
                />
              );
            })}
        </div>
      </section>
      <section>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Cheese
        </h1>
        <div className="flex gap-2 flex-wrap justify-center h-[200px] overflow-y-auto pb-2 scrollbar-thin  scrollbar-track-transparent">
          {ingredients
            .filter((ingredient) => ingredient.type === "cheese")
            .map((ingredient) => {
              return (
                <IngredientCard
                  key={ingredient._id}
                  ingredient={ingredient}
                  isSelected={false}
                />
              );
            })}
        </div>
      </section>
      <section>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Sauce
        </h1>
        <div className="flex gap-2 flex-wrap justify-center h-[190px] overflow-y-auto pb-2 scrollbar-thin  scrollbar-track-transparent">
          {ingredients
            .filter((ingredient) => ingredient.type === "sauce")
            .map((ingredient) => {
              return (
                <IngredientCard
                  key={ingredient._id}
                  ingredient={ingredient}
                  isSelected={false}
                />
              );
            })}
        </div>
      </section>
      <section>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Veggies
        </h1>
        <div className="flex gap-2 flex-wrap justify-center h-[300px] overflow-y-auto pb-2 scrollbar-thin  scrollbar-track-transparent">
          {ingredients
            .filter((ingredient) => ingredient.type === "veggies")
            .map((ingredient) => {
              return (
                <IngredientCard
                  key={ingredient._id}
                  ingredient={ingredient}
                  isSelected={false}
                />
              );
            })}
        </div>
      </section>
      <section>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Meat
        </h1>
        <div className="flex gap-2 flex-wrap justify-center h-[200px] overflow-y-auto pb-2 scrollbar-thin  scrollbar-track-transparent">
          {ingredients
            .filter((ingredient) => ingredient.type === "meat")
            .map((ingredient) => {
              return (
                <IngredientCard
                  key={ingredient._id}
                  ingredient={ingredient}
                  isSelected={false}
                />
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default MakePizza;
