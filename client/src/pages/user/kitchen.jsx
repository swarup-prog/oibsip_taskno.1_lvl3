import { useSelector } from "react-redux";
import "../../App.CSS";
import { Tab } from "../../components";
import { useState } from "react";
import AvailablePizza from "./contents/availablePizza";
import MakePizza from "./contents/makePizza";

const Kitchen = () => {
  const user = useSelector((state) => state.userData);
  const tab = localStorage.getItem("userActiveTab");
  const [activeTab, setActiveTab] = useState(tab ? tab : "Available Pizza");

  const [order, setOrder] = useState({
    pizzaBase: "",
    cheese: "",
    sauce: "",
    veggies: "",
    meat: "",
  });

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    localStorage.setItem("userActiveTab", tabTitle);
  };

  return (
    <div className="pt-20 px-16 pb-5  flex min-h-screen bg-gray-100 gap-5">
      <aside className=" items-center flex-col gap-2 flex-initial w-80 dashboard-section">
        <Tab
          title={"Available Pizza"}
          onClick={handleTabClick}
          isActive={activeTab === "Available Pizza"}
        />
        <Tab
          title={"Make Custom Pizza"}
          onClick={handleTabClick}
          isActive={activeTab === "Make Custom Pizza"}
        />
      </aside>
      <section className=" flex-1 dashboard-section w-full h-[899px] overflow-y-auto ">
        {activeTab === "Available Pizza" && <AvailablePizza />}
        {activeTab === "Make Custom Pizza" && <MakePizza />}
      </section>
      <aside className=" items-center flex-col gap-2 flex-initial w-96 dashboard-section">
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Your Order
        </h1>
        <div className="flex flex-col bg-accent text-secondary p-4 w-full rounded-lg gap-3">
          <span>Pizza Base: {order.pizzaBase}</span>
          <span>Cheese: {order.cheese}</span>
          <span>Sauce: {order.sauce}</span>
          {order.veggies && <span>Veggies: {order.veggies}</span>}
          {order.meat && <span>Meat: {order.meat}</span>}
        </div>
      </aside>
    </div>
  );
};

export default Kitchen;
