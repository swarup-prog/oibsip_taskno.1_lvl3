import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setIngredientNoType,
  clearIngredient,
} from "../../features/customOrderSlice";

const FavouriteCard = ({ data, isSelected, onClick }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSelected) {
      dispatch(clearIngredient());
      dispatch(
        setIngredientNoType({
          pizzaBase: data.pizzaBase,
          cheese: data.cheese,
          sauce: data.sauce,
          veggies: data.veggies,
          meat: data.meat,
        })
      );
    }
  }, [isSelected]);

  return (
    <div
      className="flex flex-col bg-accent text-secondary rounded-md p-3 w-[288px] cursor-pointer"
      onClick={onClick}
    >
      <h1 className="text-md font-medium mb-2 pb-2">{data.pizzaName}</h1>
      <div className="flex flex-col gap-2">
        <span className="text-sm">Pizza Base: {data.pizzaBase.name}</span>
        <span className="text-sm">Cheese: {data.cheese.name}</span>
        <span className="text-sm">Sauce: {data.sauce.name}</span>
        <span className="text-sm">Veggies: {data.veggies.name}</span>
        <span className="text-sm">Meat: {data.meat.name}</span>
      </div>
      <div className="mt-5">Total: Rs. {data.total}</div>
    </div>
  );
};

export default FavouriteCard;
