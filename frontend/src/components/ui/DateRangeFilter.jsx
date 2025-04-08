import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";


export function DateRangeFilter() {
  const [date, setDate] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Date Range:</span>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal flex items-center border-gray-200",
                !date && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(newDate) => {
                if (newDate) setDate(newDate);
              }}
              numberOfMonths={2}
            />
            <div className="flex items-center justify-end gap-2 p-3 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCalendarOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => setIsCalendarOpen(false)}
              >
                Apply Range
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Quick Select:</span>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="text-xs border-gray-200">
            Last Week
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-gray-200">
            Last Month
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-gray-200">
            Last Quarter
          </Button>
          <Button size="sm" className="text-xs bg-transit-teal hover:bg-transit-teal/90">
            Year to Date
          </Button>
        </div>
      </div>
    </div>
  );
}
