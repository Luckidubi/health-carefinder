import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { states } from '@/constants';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { ComboboxProps } from '@/types';


const StateComboBox = ({ onSelect }: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? states.find((state) => state.value === value)?.label
              : "Select state..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <Command>
            <CommandInput placeholder="Search state..." className="h-9" />
            <CommandEmpty>No state found.</CommandEmpty>
            <CommandGroup>
              {states.map((state) => (
                <CommandItem
                  key={state.value}
                  onSelect={() => {
                    setValue(state.value);
                    onSelect(state.latitude, state.longitude);
                    setOpen(false);
                  }}
                >
                  {state.label}
                  <CheckIcon
                    className={
                      value === state.value
                        ? "ml-auto h-4 w-4 opacity-100"
                        : "ml-auto h-4 w-4 opacity-0"
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default StateComboBox