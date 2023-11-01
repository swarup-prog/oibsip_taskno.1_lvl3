import { useSelector } from "react-redux";
import "../../App.CSS";
import { CustomButton, Tab } from "../../components";
import { useEffect, useState } from "react";
import AvailablePizza from "./contents/availablePizza";
import MakePizza from "./contents/makePizza";

const Kitchen = () => {
  const user = useSelector((state) => state.userData);
  const ingredients = useSelector((state) => state.customOrder.ingredients);
  const tab = localStorage.getItem("userActiveTab");
  const [activeTab, setActiveTab] = useState(tab ? tab : "Available Pizza");

  const [order, setOrder] = useState({
    pizzaBase: "",
    cheese: "",
    sauce: "",
    veggies: "",
    meat: "",
    total: 0,
  });

  useEffect(() => {
    if (ingredients) {
      const newOrder = { ...order };
      newOrder.total = 0;

      for (const key in ingredients) {
        console.log(key);
        newOrder[key] = ingredients[key]._id;

        const ingredientPrice = ingredients[key].price;
        newOrder.total = newOrder.total + ingredientPrice;
      }

      // Update the order state with the new values
      setOrder(newOrder);
      console.log(order);
    }
  }, [ingredients]);

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
          <div className="flex justify-around border-b-2 border-b-gray-100 pb-2">
            <span>Ingredients</span>
            <span>Price</span>
          </div>
          {ingredients.pizzaBase && (
            <div className="flex justify-between px-10">
              <span>{ingredients.pizzaBase.name}</span>
              <span>Rs. {ingredients.pizzaBase.price}</span>
            </div>
          )}
          {ingredients.cheese && (
            <div className="flex justify-between px-10">
              <span>{ingredients.cheese.name}</span>
              <span>Rs. {ingredients.cheese.price}</span>
            </div>
          )}
          {ingredients.sauce && (
            <div className="flex justify-between px-10">
              <span>{ingredients.sauce.name}</span>
              <span>Rs. {ingredients.sauce.price}</span>
            </div>
          )}
          {ingredients.veggies && (
            <div className="flex justify-between px-10">
              <span>{ingredients.veggies.name}</span>
              <span>Rs. {ingredients.veggies.price}</span>
            </div>
          )}
          {ingredients.meat && (
            <div className="flex justify-between px-10">
              <span>{ingredients.meat.name}</span>
              <span>Rs. {ingredients.meat.price}</span>
            </div>
          )}
          <div className="border-b-2 border-b-gray-100 my-7"></div>
          <div className="flex justify-between px-10">
            <span>Total Amount</span>
            <span>Rs. {order.total}</span>
          </div>
        </div>
        <CustomButton title={"Place Order"} className={`mt-7`} />
      </aside>
    </div>
  );
};

export default Kitchen;
