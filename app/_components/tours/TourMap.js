"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function TourMap({ locations }) {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // We wrap this in an async function so we can await the leaflet import
    const initMap = async () => {
      // 1. DYNAMICALLY IMPORT LEAFLET ONLY ON THE CLIENT
      const L = (await import("leaflet")).default;

      // If the map is already initialized, skip
      if (mapInstance.current) return;

      // 2. Initialize the Leaflet map
      mapInstance.current = L.map(mapContainer.current, {
        zoomControl: false,
        scrollWheelZoom: false,
      });
      L.control.zoom({ position: "bottomright" }).addTo(mapInstance.current);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      const bounds = L.latLngBounds();

      const customIcon = L.icon({
        iconUrl: "/img/pin.png",
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -45],
      });

      // 3. Loop through locations and add markers
      locations.forEach((loc) => {
        const [lng, lat] = loc.coordinates;
        const latLng = [lat, lng];

        L.marker(latLng, { icon: customIcon })
          .addTo(mapInstance.current)
          .bindPopup(
            `<p class="font-bold text-slate-700 text-sm m-0">Day ${loc.day}: ${loc.description}</p>`,
            {
              autoClose: false,
              closeOnClick: false,
            },
          )
          .openPopup();

        bounds.extend(latLng);
      });

      // 4. Fit the map bounds
      mapInstance.current.fitBounds(bounds, {
        padding: [100, 100],
      });
    };

    // Call the async function
    initMap();

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [locations]);

  return (
    <div ref={mapContainer} className="absolute top-0 bottom-0 w-full z-0" />
  );
}
