import * as React from "react";
import { PiMap, PiService } from "pointinside";
import { pointinsideConfig, venueId, aisle } from "./constants";

export const PointInside = () => {
  let pisvc, pimap, venue;
  const [, setMapErrors] = React.useState(null)

  const handleMapErrors = () => setMapErrors("Map is not available")

  const initMap = () =>
    new Promise((resolve) => {
      const { apiKey, apiUrl, appName, appVersion } = pointinsideConfig;

      pisvc = new PiService({
        apiKey,
        apiUrl,
        appName,
        appVersion,
        overrideGeolocation: true,
      });
      pisvc
        .getVenueById({ venueId })
        .then((selectedVenue) => {
          venue = selectedVenue;
          pimap = new PiMap({
            element: document.querySelector("#pi-map"),
            service: pisvc,
            controls: false,
          });
          pimap.setVenue({ venue }).then(resolve).catch(handleMapErrors);
        })
        .catch(handleMapErrors);
    });

  const getShopLocation = () =>
    new Promise((resolve) =>
      pisvc.getPlaces({ venueId, aisle }).then((places) => {
        const currentStorePlace = places.find((place) => place.aisle === aisle);

        const location = {
          x: currentStorePlace.locationPixelX,
          y: currentStorePlace.locationPixelY,
          zone: currentStorePlace.zoneId,
        };

        console.log({ location })

        resolve(location);
      })
    );

  const setShopOnMap = () => {
    getShopLocation()
      .then((location) => {
        addMarker({
          options: { location, color: "green" },
        });
      })
      .catch(handleMapErrors);
  };

  const addMarker = ({ options }) =>
    new Promise((resolve) =>
      pimap.addMarker(options).then(resolve).catch(handleMapErrors)
    );

  React.useEffect(() => {
    initMap().then(setShopOnMap).catch(handleMapErrors);
  }, []);

  return <div id="pi-map"></div>;
};
