import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/data_picker";
import { DropdownMenuRadioGroupDemo } from "@/components/ui/dropDown";
import { ArrowLeftRight, Search, ChevronDown, Check, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Custom marker icon function
const createCustomIcon = () => {
  return new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
  });
};

export const Mapbox = ({ routes }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Fix Leaflet icon issue - moved inside the component
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);
  
  if (!routes || routes.length === 0) return <div className="flex justify-center items-center h-[400px] border rounded-md bg-gray-50">Loading map data...</div>;
  
  const lat = parseFloat(routes[0].lat);
  const lon = parseFloat(routes[0].lon);
  const position = selectedLocation || [lat, lon];
  
  const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (map && position) {
        map.setView(position, 13, {
          animate: true,
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    }, [position, map]);
    return null;
  };
  
  // Process routes to create markers
  const markers = routes.map((route, index) => {
    const position = [parseFloat(route.lat), parseFloat(route.lon)];
    return (
      <Marker 
        key={index} 
        position={position}
        icon={createCustomIcon()}
        eventHandlers={{
          click: () => {
            setSelectedLocation(position);
          }
        }}
      >
        <Popup className="custom-popup">
          <div className="font-medium">{route.name || `Location ${index + 1}`}</div>
          <div className="text-sm text-gray-600">
            Lat: {route.lat}, Lon: {route.lon}
          </div>
          {route.description && (
            <div className="mt-1 text-sm">{route.description}</div>
          )}
        </Popup>
      </Marker>
    );
  });

  return (
    <Card className="p-4 shadow-md rounded-lg border border-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-medium text-lg flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-500" />
          Map View
        </h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={() => setSelectedLocation([lat, lon])}
          >
            Reset View
          </Button>
        </div>
      </div>
      
      <div className="w-full h-[400px] rounded-md overflow-hidden border border-gray-200">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{ borderRadius: '0.375rem' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap position={position} />
          {markers}
          
          {/* Highlight selected location with a circle */}
          {selectedLocation && (
            <Circle
              center={selectedLocation}
              radius={200}
              pathOptions={{ fillColor: 'blue', fillOpacity: 0.1, color: 'blue', weight: 1 }}
            />
          )}
        </MapContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Displaying {routes.length} location{routes.length !== 1 ? 's' : ''}. Click on a marker for details.
      </div>
    </Card>
  );
};