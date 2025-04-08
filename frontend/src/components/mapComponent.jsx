import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/data_picker";
import { DropdownMenuRadioGroupDemo } from "@/components/ui/dropDown";
import { ArrowLeftRight, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Fix leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Map location control
const LocationControl = () => {
  const map = useMap();
  
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo([latitude, longitude], 13);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };
  
  return (
    <div className="absolute right-4 top-4 bg-white p-2 rounded-md shadow-md z-400">
      <Button onClick={handleClick} variant="ghost" size="icon" className="h-8 w-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
        </svg>
      </Button>
    </div>
  );
};

// Search suggestions component
const LocationSuggestions = ({ suggestions, onSelect, isVisible }) => {
  if (!isVisible || !suggestions.length) return null;
  
  return (
    <Card className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
      {suggestions.map((item, index) => (
        <div 
          key={index}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(item)}
        >
          <p className="text-sm">{item.display_name}</p>
        </div>
      ))}
    </Card>
  );
};

// Recent searches component
const RecentSearches = ({ searches, onSelect, onClear }) => {
  if (!searches.length) return null;
  
  return (
    <Card className="mt-4 p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-700">Recent Searches</h3>
        <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-gray-500 hover:text-gray-700">
          Clear All
        </Button>
      </div>
      <div className="space-y-2">
        {searches.map((search, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(search)}
          >
            <div className="flex items-center">
              <div className="text-blue-500 mr-2">
                <Search size={16} />
              </div>
              <span className="text-sm">
                {search.from} to {search.to}
              </span>
            </div>
            <span className="text-xs text-gray-500">{search.date}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// MapResizeHandler to fix zoom issues
const MapResizeHandler = () => {
  const map = useMap();
  
  React.useEffect(() => {
    // Fix initial render
    setTimeout(() => {
      map.invalidateSize({ pan: false });
    }, 300);
    
    // Handle window resize events
    const handleResize = () => {
      map.invalidateSize({ pan: false });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);
  
  return null;
};

// Map marker component
const MapMarkers = ({ markers }) => {
  const map = useMap();
  
  // If we have markers, fit the map to include all markers
  useEffect(() => {
    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lon]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lon], 13);
    }
  }, [markers, map]);
  
  return markers.map((marker, index) => (
    <Marker key={index} position={[marker.lat, marker.lon]}>
      <Popup>
        {marker.name || marker.display_name}
      </Popup>
    </Marker>
  ));
};

export default function MapView() {
  const defaultPosition = [51.505, -0.09];
  const ContainerType = ["20' Standard","40' Standard","40' High Cube","20' Refrigerated"];
  
  // Form state
  const [fromQuery, setFromQuery] = useState("");
  const [activeInputId, setActiveInputId] = useState(null); // 'from' or 'to'
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [toQuery, setToQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedContainer, setSelectedContainer] = useState(ContainerType[0]);
  
  // Search suggestions state
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isFromSuggestionsOpen, setIsFromSuggestionsOpen] = useState(false);
  const [isToSuggestionsOpen, setIsToSuggestionsOpen] = useState(false);
  
  // Selected locations
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  
  // Map markers
  const [mapMarkers, setMapMarkers] = useState([]);
  
  // Recent searches
  const [recentSearches, setRecentSearches] = useState([
    { from: "Shanghai", to: "Rotterdam", date: "2025-04-10" },
    { from: "Singapore", to: "Los Angeles", date: "2025-04-15" }
  ]);
  const [showSearches, setShowSearches] = useState(false);
  
  // Refs for search input containers
  const fromInputContainerRef = useRef(null);
  const toInputContainerRef = useRef(null);
  
  // Search functionality
  const searchLocation = async (query, setSearchResults, setIsOpen) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
      console.log("=====",recentSearches)
      setIsOpen(true);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };
  
  // Debounce function to prevent too many API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  // Debounced search functions
  const debouncedFromSearch = debounce(
    (query) => searchLocation(query, setFromSuggestions, setIsFromSuggestionsOpen), 
    300
  );
  
  const debouncedToSearch = debounce(
    (query) => searchLocation(query, setToSuggestions, setIsToSuggestionsOpen), 
    300
  );
  
  // Handle input changes
  const handleFromInputChange = (e) => {
    const query = e.target.value;
    setFromQuery(query);
    debouncedFromSearch(query);
  };
  
  const handleToInputChange = (e) => {
    const query = e.target.value;
    setToQuery(query);
    debouncedToSearch(query);
  };
  
  // Handle suggestion selection
  const handleFromSuggestionSelect = (item) => {
    setFromQuery(item.display_name.split(',')[0]);
    setFromLocation(item);
    setIsFromSuggestionsOpen(false);
    
    // Update map markers
    updateMapMarkers(item, toLocation);
  };
  
  const handleToSuggestionSelect = (item) => {
    setToQuery(item.display_name.split(',')[0]);
    setToLocation(item);
    setIsToSuggestionsOpen(false);
    
    // Update map markers
    updateMapMarkers(fromLocation, item);
  };
  
  // Update map markers when locations change
  const updateMapMarkers = (from, to) => {
    const markers = [];
    if (from) {
      markers.push({
        ...from,
        lat: parseFloat(from.lat),
        lon: parseFloat(from.lon)
      });
    }
    if (to) {
      markers.push({
        ...to,
        lat: parseFloat(to.lat),
        lon: parseFloat(to.lon)
      });
    }
    setMapMarkers(markers);
  };
  // Handle search button click
  const handleSearch = () => {
    if (fromLocation && toLocation) {
      // Add to recent searches
      const newSearch = {
        from: fromQuery,
        to: toQuery,
        date: selectedDate.toISOString().split('T')[0],
        fromLocation,
        toLocation
      };
      
      setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
      
      // Update map to show route
      updateMapMarkers(fromLocation, toLocation);
    }
  };
  
  // Handle selection from recent searches
  const handleSelectSearch = (search) => {
    if (search.fromLocation && search.toLocation) {
      setFromQuery(search.from);
      setToQuery(search.to);
      setFromLocation(search.fromLocation);
      setToLocation(search.toLocation);
      updateMapMarkers(search.fromLocation, search.toLocation);
    } else {
      setFromQuery(search.from);
      setToQuery(search.to);
      // We would need to fetch location data here if not stored
    }
    setShowSearches(false);
  };
  
  const handleClearSearches = () => {
    setRecentSearches([]);
    setShowSearches(false);
  };
  
  // Click outside handler for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromInputContainerRef.current && !fromInputContainerRef.current.contains(event.target)) {
        setIsFromSuggestionsOpen(false);
      }
      if (toInputContainerRef.current && !toInputContainerRef.current.contains(event.target)) {
        setIsToSuggestionsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle locations
  const handleToggleLocations = () => {
    const tempQuery = fromQuery;
    const tempLocation = fromLocation;
    
    setFromQuery(toQuery);
    setFromLocation(toLocation);
    setToQuery(tempQuery);
    setToLocation(tempLocation);
    
    // Update map markers
    updateMapMarkers(toLocation, tempLocation);
  };

  return (
    <div className="relative h-full w-full">
      {/* Map container */}
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarkers markers={mapMarkers} />
        <LocationControl />
        <MapResizeHandler />
      </MapContainer>

      {/* Overlay components */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 min-w-min bg-opacity-80 z-10 bg-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-row items-center h-min gap-5">
          {/* From field with suggestions */}
          <div ref={fromInputContainerRef} className="relative w-52">
            <Input 
              type="text" 
              placeholder="Origin City/Terminal" 
              value={fromQuery}
              onChange={handleFromInputChange}
              onFocus={() => {
                setIsFromSuggestionsOpen(fromSuggestions.length > 0);
                setShowSearches(true);
              }}
            />
            <LocationSuggestions 
              suggestions={fromSuggestions} 
              onSelect={handleFromSuggestionSelect} 
              isVisible={isFromSuggestionsOpen}
            />
          </div>
          
          {/* Direction toggle button */}
          <div 
            className="bg-white rounded-2xl p-2 text-gray-600 cursor-pointer hover:bg-gray-100"
            onClick={handleToggleLocations}
          >
            <ArrowLeftRight />
          </div>
          
          {/* To field with suggestions */}
          <div ref={toInputContainerRef} className="relative w-52">
            <Input 
              type="text" 
              placeholder="Destination City/Terminal" 
              value={toQuery}
              onChange={handleToInputChange}
              onFocus={() => {
                setIsToSuggestionsOpen(toSuggestions.length > 0);
                setShowSearches(false);
              }}
            />
            <LocationSuggestions 
              suggestions={toSuggestions} 
              onSelect={handleToSuggestionSelect} 
              isVisible={isToSuggestionsOpen}
            />
          </div>
          
          {/* Date picker */}
          <DatePickerDemo 
            className="w-min" 
            value={selectedDate} 
            onChange={setSelectedDate} 
          />
          
          {/* Container type dropdown */}
          <DropdownMenuRadioGroupDemo 
            className="w-min" 
            ContainerType={ContainerType}
            value={selectedContainer}
            onValueChange={setSelectedContainer}
          />
          
          {/* Search button */}
          <div className="bg-buttonColor rounded-xl">
            <button className="p-2" onClick={handleSearch}>
              <Search color="white" size={28} />
            </button>
          </div>
        </div>
        
        {showSearches && (
        
          <RecentSearches 
            searches={fromSuggestions} 
            onSelect={handleSelectSearch} 
            onClear={handleClearSearches} 
          />
        )}
      </div>
      
      {/* Coordinates display */}
      <div className="absolute bottom-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
        <div className="text-sm">
          Current coordinates: {mapMarkers.length > 0 
            ? `${mapMarkers[0].lat.toFixed(4)}, ${mapMarkers[0].lon.toFixed(4)}` 
            : `${defaultPosition[0]}, ${defaultPosition[1]}`}
        </div>
      </div>
    </div>
  );
}