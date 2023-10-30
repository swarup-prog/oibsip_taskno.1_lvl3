import Notification from "../cards/Notification";
import { forwardRef } from "react";

const DropdownMenu = forwardRef(({ className }) => {
  return (
    <div
      className={`fixed mt-12 z-10 min-w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${className}`}
      role="menu"
    >
      <div className="p-2">
        <strong className="block p-2 text-xs font-medium uppercase text-ternary">
          Notifications
        </strong>

        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  );
});

export default DropdownMenu;
