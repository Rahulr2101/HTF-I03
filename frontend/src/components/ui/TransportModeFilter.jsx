import { Plane, Ship, Truck, Train } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export function TransportModeFilter() {
  const transportModes = [
    { id: "all", label: "All Modes", icon: null },
    { id: "road", label: "Road", icon: Truck, color: "text-transit-road" },
    { id: "rail", label: "Rail", icon: Train, color: "text-transit-rail" },
    { id: "sea", label: "Sea", icon: Ship, color: "text-transit-sea" },
    { id: "air", label: "Air", icon: Plane, color: "text-transit-air" },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">Transport Mode:</span>
      <ToggleGroup type="multiple" variant="outline" defaultValue={["all"]}>
        {transportModes.map((mode) => (
          <ToggleGroupItem 
            key={mode.id} 
            value={mode.id}
            className={cn(
              "border-gray-200 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900",
              mode.id === "all" && "data-[state=on]:bg-transit-teal data-[state=on]:text-white"
            )}
          >
            <div className="flex items-center gap-1.5">
              {mode.icon && (
                <mode.icon className={cn("h-4 w-4", mode.color)} />
              )}
              <span>{mode.label}</span>
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
