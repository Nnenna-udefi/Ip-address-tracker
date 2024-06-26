import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { MapResult } from "./component/map";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [locationData, setLocationData] = useState(null);

  const apiKey = process.env.REACT_APP_GEOLOCATION_API_KEY;

  const fetchData = useCallback(
    async (ipAddress: string) => {
      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
        );
        const data = await response.json();
        setLocationData(data);
      } catch (error) {
        console.error("Error fetching data", error);
        <div>An error occured, reload the page and try again.</div>;
      }
    },
    [apiKey]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(inputValue);
  };

  useEffect(() => {
    const getUserIpAddress = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        fetchData(data.ip);
      } catch (error) {
        console.error("Error fetching user Ip Address", error);
      }
    };
    getUserIpAddress();
  }, [fetchData]);

  return (
    <div>
      <header className="flex flex-col items-center bg-mobile-bg shadow shadow-black bg-cover bg-no-repeat pt-8 pb-24 w-full  md:bg-desktop-bg">
        <h1 className="text-white text-3xl font-semibold">
          Ip Address Tracker
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="relative my-6">
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              className="border md:text-xl text-sm rounded-xl md:w-[30rem] w-96 text-dark_grey px-4 md:py-4 py-2.5 outline-none"
              value={inputValue}
              onChange={handleInputChange}
            />

            <button type="submit">
              <img
                src="/images/icon-arrow.svg"
                alt="arrow"
                className="absolute top-0.5 -mt-0.5 bg-black md:p-6 p-3.5 rounded-e-lg  right-0"
              />
            </button>
          </div>
        </form>
      </header>
      <main>
        <MapResult locationData={locationData} />
      </main>
      <footer className="bg-dark_grey py-8 text-white text-center">
        <p>
          Built with love by{" "}
          <a
            href="https://github.com/Nnenna-udefi"
            target="_blank"
            rel="noreferrer"
          >
            Nnenna Udefi
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
