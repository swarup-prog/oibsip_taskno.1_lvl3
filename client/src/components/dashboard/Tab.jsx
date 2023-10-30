const Tab = ({ title, onClick, isActive }) => {
  return (
    <div
      className={`flex justify-center ${
        isActive ? "text-secondary bg-accent" : "text-primary bg-secondary"
      } font-medium p-3, text-base cursor-pointer rounded-md w-full items-center py-3 ${
        !isActive && "hover:bg-gray-100"
      }`}
      onClick={() => onClick(title)}
    >
      {title}
    </div>
  );
};

export default Tab;
