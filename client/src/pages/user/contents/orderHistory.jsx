import { useEffect, useState } from "react";
import { GetRequest } from "../../../services/httpRequest";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const OrderHistory = () => {
  const userId = useSelector((state) => state.userData.data._id);

  const [orderData, setOrderData] = useState([]);
  const [details, setDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");

  const fetchOrderData = async () => {
    const orders = await GetRequest(`/order/getUserOrders/${userId}`);
    setOrderData(orders.data);
    console.log("orderdata: ", await orders.data._id);
  };

  useEffect(() => {
    if (userId) {
      fetchOrderData();
    }
  }, [userId]);

  console.log("fetched", orderData);

  const handleViewDetails = (orderId) => {
    setDetails(!details);
    setSelectedOrder(orderId);
  };

  return (
    <div className="overflow-x-auto w-full">
      <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
        Order History
      </h1>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Order Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Order Date
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Order Total
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>

            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        {orderData.length > 0 && (
          <tbody className="divide-y divide-gray-200">
            {orderData.map((order) => {
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(order.createdAt));
              return (
                <>
                  <tr key={order?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {order.name ? order.name : "Custom Pizza"}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2 "text-gray-700 text-center`}
                    >
                      {formattedDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      Rs. {order?.total}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {order.status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {details ? (
                        <IoIosArrowUp
                          color="#EF4343"
                          onClick={() => handleViewDetails(order._id)}
                        />
                      ) : (
                        <IoIosArrowDown
                          color="#EF4343"
                          onClick={() => handleViewDetails(order._id)}
                        />
                      )}
                    </td>
                  </tr>
                  <tr
                    className={`transition-max-height-fast transition-opacity-fast ${
                      details && selectedOrder === order._id
                        ? "max-h-20 opacity-100"
                        : "max-h-0 opacity-0 hidden"
                    } overflow-hidden`}
                  >
                    <td colSpan="4">
                      <div className="flex flex-col text-secondary bg-accent w-full rounded-b-lg px-6 py-4 relative mb-3 gap-3">
                        <span className="flex justify-around mt-2 font-medium">
                          <p className="min-w-[72px]">Ingredient</p>
                          <p className="text-left min-w-[111px]">Name</p>
                          <p className="min-w-[65px]">Unit Price</p>
                        </span>
                        <span className="flex justify-around mt-2">
                          <p className="min-w-[72px]">Pizza Base</p>
                          <p className="text-left min-w-[111px]">
                            {order.pizzaBase.name}
                          </p>
                          <p className="min-w-[65px] text-center">
                            Rs. {order.pizzaBase.price}
                          </p>
                        </span>
                        <span className="flex justify-around mt-2">
                          <p className="min-w-[72px]">Cheese</p>
                          <p className="text-left min-w-[111px]">
                            {order.cheese.name}
                          </p>
                          <p className="min-w-[65px] text-center">
                            Rs. {order.cheese.price}
                          </p>
                        </span>
                        <span className="flex justify-around mt-2">
                          <p className="min-w-[72px]">Sauce</p>
                          <p className="text-left min-w-[111px]">
                            {order.sauce.name}
                          </p>
                          <p className="min-w-[65px] text-center">
                            Rs. {order.sauce.price}
                          </p>
                        </span>
                        <span className="flex justify-around mt-2">
                          <p className="min-w-[72px]">Veggies</p>
                          <p className="text-left min-w-[111px]">
                            {order.veggies.name}
                          </p>
                          <p className="min-w-[65px] text-center">
                            Rs. {order.veggies.price}
                          </p>
                        </span>
                        <span className="flex justify-around mt-2">
                          <p className="min-w-[72px]">Meat</p>
                          <p className="text-left min-w-[111px]">
                            {order.meat.name}
                          </p>
                          <p className="min-w-[65px] text-center">
                            Rs. {order.meat.price}
                          </p>
                        </span>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default OrderHistory;
