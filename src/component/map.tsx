import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

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

delete (L.Icon.Default.prototype as any)._getIconUrl;

(L.Icon.Default.prototype as any)._getIconUrl = function (
  name: string
): string {
  return require("leaflet/dist/images/" +
    (name === "icon" ? "marker-icon" : "marker-shadow") +
    ".png");
};

let DefaultIcon = L.icon({
  iconUrl: "images/icon-location.svg",
  shadowUrl: iconShadow,
  iconSize: [31, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export const MapResult = ({ locationData }: MapProps) => {
  return (
    <div className="relative">
      {/* location result */}
      <div className="flex justify-center">
        {locationData ? (
          <div
            className="absolute font-semibold md:text-left text-center text-dark_grey -mt-16 bg-white p-4 text-2xl flex md:flex-row flex-col rounded-lg w-3/4"
            style={{ zIndex: 999 }}
          >
            <div className="md:w-1/4 w-full">
              <h2 className="uppercase tracking-widest text-light_grey text-xs py-2 font-semibold">
                Ip Address
              </h2>
              <p>{locationData?.ip}</p>
            </div>
            <div className="md:w-1/4 w-full md:border-l-2 md:pl-3 pl-0 md:py-1 py-2 border-l-0">
              <h2 className="uppercase tracking-widest font-semibold text-light_grey text-xs py-2">
                Location
              </h2>
              <p>{`${locationData?.location.city}, ${locationData?.location.country} ${locationData?.as.asn}`}</p>
            </div>
            <div className="md:w-1/4 w-full md:border-l-2 md:pl-3 pl-0 md:py-1 py-2 border-l-0">
              <h2 className="uppercase tracking-widest font-semibold text-light_grey text-xs py-2">
                Timezone
              </h2>
              <p>{locationData?.location.timezone}</p>
            </div>
            <div className="md:w-1/4 w-full md:border-l-2 md:pl-3 pl-0 md:py-1 py-2 border-l-0">
              <h2 className="uppercase tracking-widest font-semibold text-light_grey text-xs py-2">
                Isp
              </h2>
              <p>{locationData?.isp}</p>
            </div>
          </div>
        ) : (
          <div
            className="-mt-14 bg-white p-4 w-3/4 text-center rounded-lg absolute"
            style={{ zIndex: 999 }}
          >
            Loading...
          </div>
        )}
      </div>
      <div id="mapId" className="h-96 ">
        <MapContainer
          center={
            locationData
              ? [locationData.location.lat, locationData.location.lng]
              : [6.43333, 3.41667]
          }
          zoom={13}
          className="h-[80vh]"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {locationData && (
            <Marker
              position={[locationData.location.lat, locationData.location.lng]}
              icon={DefaultIcon}
            >
              <Popup className="font-semibold">
                The location is here: <br />
                {locationData.isp}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};
