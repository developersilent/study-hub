"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  LabelText: string;
  placeholder?: string;
  initalDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
}

export function DatePicker({
  LabelText,
  placeholder = "Select date",
  initalDate,
  onDateChange,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initalDate);

  // Update internal state when initalDate changes (for form resets/edits)
  React.useEffect(() => {
    // Ensure we handle date properly
    if (initalDate) {
      try {
        const validDate =
          initalDate instanceof Date ? initalDate : new Date(initalDate);
        if (!isNaN(validDate.getTime())) {
          setDate(validDate);
        } else {
          setDate(undefined);
        }
      } catch (error) {
        setDate(undefined);
      }
    } else {
      setDate(initalDate);
    }
  }, [initalDate]);

  const handleDateSelect = React.useCallback(
    (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      onDateChange?.(selectedDate);
      setOpen(false);
    },
    [onDateChange],
  );

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {LabelText}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal text-xs"
          >
            {date ? date.toLocaleDateString() : placeholder}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
