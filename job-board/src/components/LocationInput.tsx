"use client";

import citiesList from "@/lib/cities-list";
import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocused, setHasFocused] = useState(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter((city) => {
          if (!city) return false;
          return (
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            )
          );
        })
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div className="relative">
        <Input
          placeholder="Location"
          type="search"
          value={locationSearchInput}
          onChange={(e) => {
            if (e.target instanceof HTMLInputElement) {
              setLocationSearchInput(e.target.value);
            }
          }}
          onFocus={() => setHasFocused(true)}
          onBlur={() => setHasFocused(false)}
          {...props}
          ref={ref}
        />
        {locationSearchInput.trim() && hasFocused && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No cities found</p>}
            {cities.map((city) => (
              <button
                key={city}
                className="block w-full p-2 text-left"
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (city) onLocationSelected(city);
                  setLocationSearchInput("");
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

