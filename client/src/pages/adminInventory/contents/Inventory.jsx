import React from "react";
import { InventoryTable } from "../../../components";

const Inventory = () => {
  return (
    <div className="w-full flex gap-10 flex-col my-5">
      <InventoryTable heading={"Pizza Base"} />
      <InventoryTable heading={"Cheese"} />
      <InventoryTable heading={"Sauce"} />
      <InventoryTable heading={"Veggies"} />
      <InventoryTable heading={"Meat"} />
    </div>
  );
};

export default Inventory;
