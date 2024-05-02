import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <header className="flex flex-col items-center bg-mobile-bg shadow shadow-black bg-cover bg-no-repeat py-6 w-full  md:bg-desktop-bg">
        <h1 className="text-white text-2xl font-semibold">
          Ip Address Tracker
        </h1>
        <div className="relative my-6">
          <input
            type="text"
            placeholder="Search for any Ip address or domain"
            className="border rounded-xl md:w-96 w-full  px-4 py-2 outline-none"
          />

          <img
            src="/images/icon-arrow.svg"
            alt="arrow"
            className="absolute top-0.5 -mt-0.5 bg-black px-4 py-3.5 rounded-e-lg  right-0"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
