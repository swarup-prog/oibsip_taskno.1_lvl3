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

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    localStorage.setItem("userActiveTab", tabTitle);
  };

  return (
    <div className="pt-20 px-[245.6px] pb-5  flex min-h-screen bg-gray-100 gap-5">
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
      <section className=" flex-1 dashboard-section w-full">
        {activeTab === "Available Pizza" && <AvailablePizza />}
        {activeTab === "Make Custom Pizza" && <MakePizza />}
      </section>
    </div>
  );
};

export default Kitchen;
