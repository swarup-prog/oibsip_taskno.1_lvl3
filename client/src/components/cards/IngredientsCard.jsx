const IngredientsCard = ({
  ingredient,
  small = ingredient.description ? false : true,
  isSelected,
}) => {
  return (
    <div
      className={`${
        isSelected ? "border-accent border-2" : " border-gray-200"
      } border flex flex-col  ${
        small ? "w-60 h-[90px]" : "w-80 h-[170px]"
      } px-3 py-3  hover:shadow-accent  hover:border-none hover:shadow-md rounded-lg cursor-pointer justfy-center items-center gap-2`}
    >
      <h1 className="font-bold text-lg">{ingredient.name}</h1>
      <p className="text-xs text-justify text-ternary">
        {ingredient.description}
      </p>
      <span className="text-accent font-[600] text-sm">
        Rs. {ingredient.price}
      </span>
    </div>
  );
};

export default IngredientsCard;
