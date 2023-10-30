import { useState } from "react";
import Orders from "./contents/Orders";
import Inventory from "./contents/Inventory";
import AddIngredients from "./contents/AddIngredients";

import "../../App.css";
import { Tab } from "../../components";

const AdminInventory = () => {
  const [activeTab, setActiveTab] = useState("Orders");

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  return (
    <div className="pt-20 px-[245.6px] pb-5  flex min-h-screen bg-gray-200 gap-5">
      <aside className=" items-center flex-col gap-2 flex-initial w-80 dashboard-section">
        <Tab
          title={"Orders"}
          onClick={handleTabClick}
          isActive={activeTab === "Orders"}
        />
        <Tab
          title={"Inventory"}
          onClick={handleTabClick}
          isActive={activeTab === "Inventory"}
        />
        <Tab
          title={"Add Ingredients"}
          onClick={handleTabClick}
          isActive={activeTab === "Add Ingredients"}
        />
      </aside>
      <section className=" flex-1 dashboard-section">
        {activeTab === "Orders" && <Orders />}
        {activeTab === "Inventory" && <Inventory />}
        {activeTab === "Add Ingredients" && <AddIngredients />}
      </section>
    </div>
  );
};

export default AdminInventory;
