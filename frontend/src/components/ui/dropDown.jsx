import * as React from "react";
import { Box, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuRadioGroupDemo({ ContainerType }) {
  const [position, setPosition] = React.useState("bottom");
  const [current, setCurrent] = React.useState("Select Container");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center">
            <Box size={16} className="mr-2 text-gray-500" />
            <span className="truncate">{current}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 text-gray-500"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white shadow-lg border border-gray-200 rounded-lg">
        <DropdownMenuLabel className="text-gray-700">Container Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) => {
            setCurrent(value);
            setPosition(value);
          }}
          className="max-h-64 overflow-y-auto"
        >
          {ContainerType.map((e) => (
            <DropdownMenuRadioItem 
              key={e} 
              value={e}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-100"
            >
              <span>{e}</span>
              {current === e && <Check size={16} className="text-blue-600" />}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}