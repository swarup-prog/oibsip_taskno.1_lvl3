import { CustomButton, Navbar } from "../../components";

import "../../App.css";

const Home = () => {
  return (
    <section className=" home">
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className=" flex flex-col justify-start items-center max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Order your own
            <strong className="block font-extrabold text-accent">
              Custom Pizza.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Choose any pizza base, sauce, cheese and veggies from different
            options and enjoy your own Custom Pizza for a flavourful experience.
          </p>

          <CustomButton className="mt-8" title={`Make Pizza`} />
        </div>
      </div>
    </section>
  );
};

export default Home;
