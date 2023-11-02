import { InventoryTable } from "../../../components";

const Inventory = () => {
  return (
    <div className="w-full  my-5 h-full">
      <div className="flex gap-10 flex-col">
        <InventoryTable heading={"Pizza Base"} />
        <InventoryTable heading={"Cheese"} />
        <InventoryTable heading={"Sauce"} />
        <InventoryTable heading={"Veggies"} />
        <InventoryTable heading={"Meat"} />
      </div>
    </div>
  );
};

export default Inventory;
