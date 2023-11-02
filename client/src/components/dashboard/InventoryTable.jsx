import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setIngredient } from "../../features/ingredientSlice";

const InventoryTable = ({ heading }) => {
  const dispatch = useDispatch();

  const words = heading.split(" ");
  const type = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");

  const ingredients = useSelector((state) => state.inventory.data);

  const handleUpdate = (ingredient) => {
    dispatch(setIngredient(ingredient));
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
        {heading}
      </h1>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Price
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Quantity
            </th>

            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {ingredients
            .filter((ingredient) => ingredient.type === type)
            .map((ingredient) => {
              return (
                <tr key={ingredient._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {ingredient.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    Rs. {ingredient.price}
                  </td>
                  <td
                    className={`whitespace-nowrap px-4 py-2 ${
                      ingredient.quantity > 20 ? "text-gray-700" : "text-accent"
                    } text-center`}
                  >
                    {ingredient.quantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-center">
                    <AiFillEdit
                      size={17}
                      className="hover:text-accent cursor-pointer"
                      onClick={() => handleUpdate(ingredient)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
