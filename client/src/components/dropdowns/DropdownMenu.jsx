import axios from "axios";
import Notification from "../cards/Notification";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../utils/toast";

const DropdownMenu = ({ className }) => {
  const notifications = useSelector((state) => state.notification.data);
  console.log("Noti", notifications);

  return (
    <div
      className={`fixed mt-12 z-10 min-w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${className} `}
      role="menu"
    >
      <div className="p-2 h-[308px] overflow-y-auto">
        <strong className="block p-2 text-xs font-medium uppercase text-ternary ">
          Notifications
        </strong>

        {notifications.length > 0 ? (
          notifications.map((notification) => {
            return (
              <Notification details={notification} key={notification._id} />
            );
          })
        ) : (
          <div>There are no new notifications.</div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
