import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { MediaType } from "../services/api";

const mediaTypes = [
  { name: "All", value: "" },
  { name: "Movie", value: MediaType.Movie },
  { name: "Series", value: MediaType.Series },
  { name: "Episode", value: MediaType.Episode },
];

export default function TypeSelectMenu({ onTypeSelect }) {
  const [selectedType, setSelectedType] = useState(mediaTypes[0]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    onTypeSelect(type);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {selectedType.name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      {mediaTypes.map((type) => (
          <MenuItem
            key={type.name}
            as="button"
            onClick={() => handleTypeSelect(type)}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {type.name}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
