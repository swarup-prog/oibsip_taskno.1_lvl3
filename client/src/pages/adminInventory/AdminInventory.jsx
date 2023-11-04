import { useEffect, useState } from "react";
import Orders from "./contents/Orders";
import Inventory from "./contents/Inventory";
import AddIngredients from "./contents/AddIngredients";
import { useSelector } from "react-redux";
import { CustomButton, UpdateModal } from "../../components";

import "../../App.css";
import { Tab } from "../../components";

const AdminInventory = () => {
  const tab = localStorage.getItem("adminActiveTab");
  const [activeTab, setActiveTab] = useState(tab ? tab : "Orders");

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    localStorage.setItem("adminActiveTab", tabTitle);
  };

  const ingredient = useSelector((state) => state.selectedIngredient);
  console.log(ingredient);
  const [isModalOpen, setIsModalOpen] = useState(ingredient.isSelected);

  useEffect(() => {
    setIsModalOpen(ingredient.isSelected);
  }, [ingredient.isSelected]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userActiveTab");
    localStorage.removeItem("adminActiveTab");
    dispatch(clearUserData());
  };

  return (
    <>
      <UpdateModal isOpen={isModalOpen} />
      <div className="pt-20 px-16 pb-5  flex min-h-screen bg-gray-100 gap-5">
        <aside className=" items-center flex-col gap-2 flex-initial w-80 dashboard-section justify-between">
          <div className="w-full flex flex-col gap-2">
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
          </div>
          <CustomButton
            title="Logout"
            onClick={handleLogout}
            className={`w-[288px] h-[48px] justify-center items-center`}
          />
        </aside>
        <section className="px-32 flex-1 dashboard-section w-full h-[899px] overflow-y-auto ">
          {activeTab === "Orders" && <Orders />}
          {activeTab === "Inventory" && <Inventory />}
          {activeTab === "Add Ingredients" && <AddIngredients />}
        </section>
      </div>
    </>
  );
};

export default AdminInventory;
