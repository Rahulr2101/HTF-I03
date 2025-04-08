import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Ship, Truck, Train } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShipmentMap() {
  // Mock data for shipment locations
  const shipmentLocations = [
    { id: 1, top: "20%", left: "25%", type: "truck", status: "on-time" },
    { id: 2, top: "35%", left: "60%", type: "plane", status: "on-time" },
    { id: 3, top: "60%", left: "40%", type: "ship", status: "delayed" },
    { id: 4, top: "75%", left: "70%", type: "rail", status: "on-time" },
  ];

  const getTransportIcon = (type) => {
    switch (type) {
      case "truck":
        return { icon: Truck, color: "text-transit-road", bg: "bg-transit-road" };
      case "rail":
        return { icon: Train, color: "text-transit-rail", bg: "bg-transit-rail" };
      case "ship":
        return { icon: Ship, color: "text-transit-sea", bg: "bg-transit-sea" };
      case "plane":
        return { icon: Plane, color: "text-transit-air", bg: "bg-transit-air" };
      default:
        return { icon: Truck, color: "text-gray-500", bg: "bg-gray-500" };
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Shipment Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          {/* Simplified world map as a placeholder - in a real app we'd use a proper map library */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
          
          {/* Continent shapes - very simplified */}
          <div className="absolute top-[15%] left-[20%] w-[25%] h-[35%] bg-gray-300 rounded-3xl opacity-30"></div>
          <div className="absolute top-[20%] left-[50%] w-[30%] h-[25%] bg-gray-300 rounded-3xl opacity-30"></div>
          <div className="absolute top-[55%] left-[15%] w-[20%] h-[25%] bg-gray-300 rounded-3xl opacity-30"></div>
          <div className="absolute top-[60%] left-[45%] w-[35%] h-[25%] bg-gray-300 rounded-3xl opacity-30"></div>
          
          {/* Shipment markers */}
          {shipmentLocations.map((location) => {
            const transport = getTransportIcon(location.type);
            const IconComponent = transport.icon;
            
            return (
              <div
                key={location.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center",
                  location.status === "delayed" ? "animate-pulse-slow" : ""
                )}
                style={{ top: location.top, left: location.left }}
              >
                <div
                  className={cn(
                    "rounded-full p-2",
                    transport.bg,
                    location.status === "delayed" ? "ring-2 ring-red-400" : ""
                  )}
                >
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
              </div>
            );
          })}
          
          {/* Map Legend */}
          <div className="absolute bottom-3 right-3 bg-white rounded-md shadow-md p-2 text-xs">
            <div className="font-medium mb-1">Shipment Status</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-3 w-3 rounded-full bg-transit-teal"></div>
              <span>On Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse"></div>
              <span>Delayed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
