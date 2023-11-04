import { useState } from "react";
import IngredientCard from "../cards/IngredientsCard";
import { useSelector } from "react-redux";

const IngredientSetion = ({ heading }) => {
  const ingredients = useSelector((state) => state.inventory.data);

  const words = heading.split(" ");
  const ingredientType = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");

  const [selected, setSelected] = useState({});
  const ingredient = ingredients.filter(
    (ingredient) => ingredient.type === ingredientType
  );

  const handleClick = (ingredient) => {
    setSelected(ingredient);
  };

  return (
    <section>
      <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
        {heading}
      </h1>
      <div
        className={`flex gap-2 flex-wrap justify-center ${
          ingredientType === "cheese" || ingredientType === "meat"
            ? "h-[210px]"
            : ingredientType === "sauce"
            ? "h-[200px]"
            : "h-[355px]"
        } overflow-y-auto pb-2 scrollbar-thin  scrollbar-track-transparent`}
      >
        {ingredient.map((ing) => {
          return (
            <IngredientCard
              key={ing._id}
              ingredient={ing}
              isSelected={selected === ing.name} 
              onClick={() => handleClick(ing.name)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default IngredientSetion;
