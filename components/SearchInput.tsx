"use client";
import {
  useCreateHospital,
  useDebouncedValue,
  useSearchHospitals,
} from "@/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { CheckIcon } from "lucide-react";
import { HospitalItemProps, extractLocationData } from "@/lib/utils";

const SearchInput = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");

  const { addHospital } = useCreateHospital();

  const debouncedSearchValue = useDebouncedValue(searchValue, 2000);
  const { data: suggestionsData, error }: any =
    useSearchHospitals(debouncedSearchValue);
  console.log("suggestionsData", suggestionsData);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setValue(suggestion.place_id);
    router.push(`/find-hospital/${suggestion.place_id}`);
  };

  const handleAddHospital = useCallback(
    async (hospital: HospitalItemProps[]) => {
      try {
        await addHospital(hospital);
      } catch (error) {
        console.error("Error adding hospital:", error);
      }
    },
    [addHospital]
  );

  useEffect(() => {
    if (suggestionsData && suggestionsData.length > 0) {
      setSuggestions(suggestionsData);
    }

    console.log("suggestionsData", suggestionsData);
  }, [suggestionsData]);

  useEffect(() => {
    const extractedSearchData = extractLocationData(suggestionsData);
    if (extractedSearchData.length > 0) {
      handleAddHospital(extractedSearchData);
    }
    console.log("search data", extractedSearchData);
  }, [suggestionsData, handleAddHospital]);

  return (
    <div className="relative max-w-[664px]">
      <input
        className="py-2 pr-8 pl-10  w-full h-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 text-center tracking-wide text-stone-500 text-[14px] font-medium leading-snug"
        type="text"
        placeholder="Search hospital"
        value={searchValue}
        onChange={handleSearchChange}
      />

      <Image
        src="/search.svg"
        alt="search"
        width={24}
        height={24}
        className="absolute top-3 right-3 "
      />
      <Image
        src="/location.svg"
        alt="location icon"
        width={24}
        height={24}
        className="absolute top-3 left-3 "
      />
      {suggestions.length > 0 && searchValue.length > 0 && (
        <div className="absolute top-12 left-0 w-full mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <Command className="">
            <CommandInput placeholder="Search state..." className="h-9" />

            <CommandGroup>
              {suggestions.length > 0 &&
                suggestions.map((suggestion: any) => (
                  <CommandItem
                    key={suggestion.place_id}
                    onSelect={() => {
                      handleSuggestionClick(suggestion);
                    }}
                  >
                    {suggestion.display_name}
                    <CheckIcon
                      className={
                        value === suggestion.place_id
                          ? "ml-auto h-4 w-4 opacity-100"
                          : "ml-auto h-4 w-4 opacity-0"
                      }
                    />
                  </CommandItem>
                ))}
              {error && <CommandEmpty>Something went wrong</CommandEmpty>}
            </CommandGroup>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
