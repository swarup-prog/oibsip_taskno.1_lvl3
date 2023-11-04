import { TbTruckDelivery } from "react-icons/tb";
import { GiCampCookingPot } from "react-icons/gi";
import { BsCheck2Circle } from "react-icons/bs";
import { BiError } from "react-icons/bi";

const Notification = ({ details }) => {
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4"
    >
      <div className="flex items-start gap-4">
        <span>
          {details.type === "low-quantity" ? (
            <BiError size={20} color="#EF4343" />
          ) : details.type === "order-placed" ? (
            <BsCheck2Circle size={20} color="green" />
          ) : details.type === "order-processing" ? (
            <GiCampCookingPot size={20} color="orange" />
          ) : (
            <TbTruckDelivery size={20} color="blue" />
          )}
        </span>

        <div className="flex-1">
          <strong className="block text-sm font-medium text-gray-900">
            {details.title}
          </strong>

          <p className="mt-1 text-xs text-gray-700">{details.message}</p>
        </div>
      </div>
      <span className="text-[10px] flex justify-end text-gray-400 mt-1">
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(details.createdAt))}
      </span>
    </div>
  );
};

export default Notification;
