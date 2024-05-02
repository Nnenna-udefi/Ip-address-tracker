import React, { useState } from "react";
import "./App.css";
import { MapResult } from "./component/map";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [locationData, setLocationData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_n0HzQ7ouJcR7ravgnyRwIyMNh0UpE&ipAddress=${inputValue}`
      );
      const data = await response.json();
      setLocationData(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <header className="flex flex-col items-center bg-mobile-bg shadow shadow-black bg-cover bg-no-repeat py-6 w-full  md:bg-desktop-bg">
        <h1 className="text-white text-2xl font-semibold">
          Ip Address Tracker
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="relative my-6">
            <input
              type="text"
              placeholder="Search for any Ip address or domain"
              className="border rounded-xl md:w-96 w-full  px-4 py-2 outline-none"
              value={inputValue}
              onChange={handleInputChange}
            />

            <button type="submit">
              <img
                src="/images/icon-arrow.svg"
                alt="arrow"
                className="absolute top-0.5 -mt-0.5 bg-black px-4 py-3.5 rounded-e-lg  right-0"
              />
            </button>
          </div>
        </form>
      </header>
      <main>
        <MapResult locationData={locationData} />
      </main>
    </div>
  );
}

export default App;
