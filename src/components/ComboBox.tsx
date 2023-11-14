"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { LanguageCode } from "../types";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type ComboOption = {
  value: string;
  label: string;
};

export default function Combobox({
  languageOptions,
  value,
  setValue,
}: {
  languageOptions: ComboOption[];
  value: LanguageCode;
  setValue: (language: LanguageCode) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] lg:w-[480px] xl:w-[640px] justify-between"
        >
          {value
            ? languageOptions.find((framework) => framework.value === value)
                ?.label
            : "Select a target language"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-4/5 lg:w-[480px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {languageOptions.map((language) => (
              <CommandItem
                key={language.value}
                value={language.value}
                onSelect={(currentValue) => {
                  setValue(
                    (currentValue === value
                      ? "es"
                      : currentValue) as LanguageCode
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === language.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
