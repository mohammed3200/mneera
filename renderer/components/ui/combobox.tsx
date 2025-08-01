"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Props = {
  options: Array<{ label: string; value: string | number }>;
  onChange?: (value: string | number) => void;
};

export function Combobox({ options, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string | number>("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: { label: string; value: string | number }) => {
    setSelectedValue(option.value);
    onChange?.(option.value);
    setSearchTerm(option.label); // update input value
    setOpen(false);
  };

  React.useEffect(() => {
    const selected = options.find((opt) => opt.value === selectedValue);
    if (selected) setSearchTerm(selected.label);
  }, [selectedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpen(true);
            }}
            onClick={() => setOpen(true)}
            placeholder="بحث..."
            className="w-full h-12 px-3 py-2 text-sm font-din-bold text-gray-400 bg-transparent border border-input rounded-md shadow-sm outline-none focus:ring-0 focus:outline-none focus:border-gray-400"
          />
          <ChevronsUpDownIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        dir="rtl"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-full p-0 font-din-bold"
        align="start"
        sideOffset={4}
      >
        <Command dir="rtl">
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty className="p-2">لا يوجد نتائج.</CommandEmpty>
            ) : (
              <CommandGroup dir="rtl">
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value.toString()}
                    onSelect={() => handleSelect(option)}
                    className="flex w-full text-right justify-end cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent focus:bg-accent"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <p className="font-din-bold font-bold text-right w-full">
                      {option.label}
                    </p>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
