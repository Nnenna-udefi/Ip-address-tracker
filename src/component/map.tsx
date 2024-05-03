import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type MapProps = {
  locationData: {
    ip: string;
    location: {
      country: string;
      region: string;
      timezone: string;
      city: string;
      lat: number;
      lng: number;
      postalCode: string;
      geonameId: number;
    };
    domains: string[];
    as: {
      asn: number;
      name: string;
      route: string;
      domain: string;
      type: string;
    };
    isp: string;
  } | null;
};

const customIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [20, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
export const MapResult = ({ locationData }: MapProps) => {
  useEffect(() => {
    let map: L.Map;
    if (locationData) {
      try {
        const latitude = locationData.location.lat;
        const longitude = locationData.location.lng;
        map = L.map("mapId").setView([latitude, longitude], 13);
        L.tileLayer(
          "https://{s}.tile.openstreetmap.transport.opendata.city/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
          }
        ).addTo(map);

        L.marker([longitude, latitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `Location: ${locationData.location.country}, ${locationData.location.region}<br>
             Timezone: ${locationData.location.timezone}<br>
             ISP: ${locationData.isp}<br>
             ASN: ${locationData.as.asn}`
          )
          .openPopup();
      } catch (error) {
        console.error("Error displaying map", error);
      }
    }
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [locationData]);

  return (
    <div className="relative">
      <div className="absolute font-semibold text-dark_grey -mt-10 z-10 ml-20 bg-white p-4 text-2xl flex justify-between rounded-lg w-3/4">
        <div>
          <h3 className="uppercase text-light_grey text-xs py-2 font-semibold">
            Ip Address
          </h3>
          <p>{locationData?.ip}</p>
        </div>
        <div className="border-l-2 pl-3">
          <h3 className="uppercase font-semibold text-light_grey text-xs py-2">
            Location
          </h3>
          <p>{`${locationData?.location.city}, ${locationData?.location.country} ${locationData?.as.asn}`}</p>
        </div>
        <div className="border-l-2 pl-3">
          <h3 className="uppercase font-semibold text-light_grey text-xs py-2">
            Timezone
          </h3>
          <p>{locationData?.location.timezone}</p>
        </div>
        <div className="border-l-2 pl-3">
          <h3 className="uppercase font-semibold text-light_grey text-xs py-2">
            Isp
          </h3>
          <p>{locationData?.isp}</p>
        </div>
      </div>
      <div id="mapId" className="h-[490px] "></div>
    </div>
  );
};
