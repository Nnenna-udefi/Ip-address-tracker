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
  iconUrl: "../public/images/icon-location.svg",
  iconSize: [32, 32],
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
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([longitude, latitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `Location: ${locationData.location.country}, ${locationData.location.region}<br>
             Timezone: ${locationData.location.timezone}<br>
             ISP: ${locationData.isp}<br>
             ASN: ${locationData.as.asn}`
          )
          .openPopup();
        console.log("map result", map);
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

  console.log("location data", locationData);

  return <div id="mapId" className="h-96"></div>;
};
