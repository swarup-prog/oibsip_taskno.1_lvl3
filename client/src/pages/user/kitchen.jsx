import { useSelector } from "react-redux";
import "../../App.CSS";
import { CustomButton, Tab, TextInput } from "../../components";
import { useEffect, useState } from "react";
import AvailablePizza from "./contents/availablePizza";
import MakePizza from "./contents/makePizza";
import { toastError, toastSuccess } from "../../utils/toast";
import { PostRequest } from "../../services/httpRequest";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { clearIngredient } from "../../features/customOrderSlice";
import { useDispatch } from "react-redux";
import pizzaImg from "../../assets/yummyPizza.jpg";

const Kitchen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData.data);
  const ingredients = useSelector((state) => state.customOrder.ingredients);
  const tab = localStorage.getItem("userActiveTab");
  const [activeTab, setActiveTab] = useState(tab ? tab : "Available Pizza");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [order, setOrder] = useState({
    pizzaName: "",
    pizzaBase: "",
    cheese: "",
    sauce: "",
    veggies: "",
    meat: "",
    total: 0,
    favourite: false,
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

  useEffect(() => {
    if (!order.favourite) {
      setOrder({ ...order, pizzaName: "" });
    }
  }, [order.favourite]);

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    localStorage.setItem("userActiveTab", tabTitle);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toastError("Razropay failed to load!!");
        return;
      }

      const response = await PostRequest(
        `/payment/createOrder/${user._id}`,
        order
      );

      if (response.status === 200) {
        var options = {
          key: "" + response.data.key_id + "",
          amount: "" + response.data.amount + "",
          currency: "INR",
          name: "" + response.data.product_name + "",
          description: "" + response.data.description + "",
          image: { pizzaImg },
          order_id: "" + response.data.order_id + "",
          handler: async function (response) {
            // toastSuccess(response.razorpay_payment_id);
            // toastSuccess(response.razorpay_order_id);
            // toastSuccess(response.razorpay_signature);
            setOrder({ ...order, paymentId: response.razorpay_payment_id });
            const res = await PostRequest(
              `/order/placeOrder/${user._id}`,
              order
            );
            if (res.status === 201) {
              toastSuccess(res.data.message);
              dispatch(clearIngredient());
              setOrder({
                pizzaName: "",
                pizzaBase: "",
                cheese: "",
                sauce: "",
                veggies: "",
                meat: "",
                total: 0,
                favourite: false,
              });
            }
          },
          prefill: {
            name: "" + response.data.name + "",
            email: "" + response.data.email + "",
          },
          theme: {
            color: "#EF4343",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        razorpayObject.on("payment.failed", function (response) {
          toastError(response.error.description);
          toastError(response.error.reason);
        });
      }
    } catch (error) {
      toastError(error.response.message);
    }
  };

  return (
    <div className="pt-20 px-16 pb-5  flex min-h-screen bg-gray-100 gap-5">
      <aside className=" items-center flex-col gap-2 flex-initial w-80 dashboard-section">
        <Tab
          title={"Make Custom Pizza"}
          onClick={handleTabClick}
          isActive={activeTab === "Make Custom Pizza"}
        />
        <Tab
          title={"Favourites"}
          onClick={handleTabClick}
          isActive={activeTab === "Favourites"}
        />
        <Tab
          title={"Order History"}
          onClick={handleTabClick}
          isActive={activeTab === "Order History"}
        />
      </aside>

      <section className=" flex-1 dashboard-section w-full h-[899px] overflow-y-auto ">
        {activeTab === "Available Pizza" && <AvailablePizza />}
        {activeTab === "Make Custom Pizza" && <MakePizza />}
      </section>

      <aside
        className={`items-center flex-col gap-2 flex-initial w-96 dashboard-section ${
          activeTab === "Order History" ? "hidden" : "flex"
        }`}
      >
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
        <div className="mt-5 flex flex-col items-center gap-5">
          <span
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setOrder({ ...order, favourite: !order.favourite });
              console.log(order);
            }}
          >
            {order.favourite ? (
              <AiFillHeart color="#EF4343" size={20} />
            ) : (
              <AiOutlineHeart color="#EF4343" size={20} />
            )}
            Add to Favourites
          </span>
          <div
            className={`transition-all duration-300 ${
              order.favourite ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <TextInput
              type="text"
              name="pizzaName"
              label="Pizza Name"
              value={order.pizzaName}
              onChange={(e) => {
                setOrder({ ...order, pizzaName: e.target.value });
              }}
            />
          </div>
        </div>
        <span>{order.pizzaName}</span>
        <CustomButton
          title={"Place Order"}
          className={`mt-7`}
          onClick={handleOrder}
        />
      </aside>
    </div>
  );
};

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default Kitchen;
