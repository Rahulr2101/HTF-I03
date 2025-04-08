import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Ship, Truck, Train } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for shipments
const shipments = [
  {
    id: "SHP-1234",
    destination: "New York, USA",
    status: "In Transit",
    statusColor: "bg-blue-500",
    transportMode: "truck",
    estimatedDelivery: "12h 30m",
    percentComplete: 65,
  },
  {
    id: "SHP-2345",
    destination: "Chicago, USA",
    status: "Delayed",
    statusColor: "bg-amber-500",
    transportMode: "rail",
    estimatedDelivery: "2d 4h",
    percentComplete: 40,
  },
  {
    id: "SHP-3456",
    destination: "Shanghai, China",
    status: "In Transit",
    statusColor: "bg-blue-500",
    transportMode: "ship",
    estimatedDelivery: "5d 12h",
    percentComplete: 25,
  },
  {
    id: "SHP-4567",
    destination: "London, UK",
    status: "On Time",
    statusColor: "bg-green-500",
    transportMode: "plane",
    estimatedDelivery: "8h 15m",
    percentComplete: 80,
  },
];

export function ShipmentOverview() {
  const getTransportIcon = (mode) => {
    switch (mode) {
      case "truck":
        return { icon: Truck, color: "text-transit-road", bg: "bg-transit-road/10" };
      case "rail":
        return { icon: Train, color: "text-transit-rail", bg: "bg-transit-rail/10" };
      case "ship":
        return { icon: Ship, color: "text-transit-sea", bg: "bg-transit-sea/10" };
      case "plane":
        return { icon: Plane, color: "text-transit-air", bg: "bg-transit-air/10" };
      default:
        return { icon: Truck, color: "text-gray-500", bg: "bg-gray-100" };
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Active Shipments</CardTitle>
          <Badge variant="outline" className="ml-2">
            {shipments.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shipments.map((shipment) => {
            const transportIcon = getTransportIcon(shipment.transportMode);
            const IconComponent = transportIcon.icon;
            
            return (
              <div key={shipment.id} className="flex items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className={cn("p-2 rounded-full mr-3", transportIcon.bg)}>
                  <IconComponent className={cn("h-5 w-5", transportIcon.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {shipment.id}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        To: {shipment.destination}
                      </p>
                    </div>
                    <Badge className={cn("text-white", shipment.statusColor)}>
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>ETA: {shipment.estimatedDelivery}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={cn(
                          "h-1.5 rounded-full",
                          shipment.status === "Delayed" ? "bg-amber-500" : "bg-transit-teal"
                        )}
                        style={{ width: `${shipment.percentComplete}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
