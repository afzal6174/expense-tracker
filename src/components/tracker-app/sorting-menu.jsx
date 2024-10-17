import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SortingMenu({ onSort }) {
  const [activeMenu, setActiveMenu] = useState(null);

  function handleClick(sortType) {
    const newSortType = activeMenu === sortType ? null : sortType;
    setActiveMenu(newSortType);
    onSort(newSortType);
  }

  return (
    <div
      className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      <div className="py-1" role="none">
        <a
          href="#"
          className={cn(
            "block px-4 py-2 text-sm text-gray-700 transition-all",
            activeMenu === "lowToHigh" ? "bg-gray-200" : "hover:bg-gray-50"
          )}
          role="menuitem"
          tabIndex="-1"
          onClick={(e) => {
            e.stopPropagation();
            handleClick("lowToHigh");
          }}
        >
          Low to High
        </a>
        <a
          href="#"
          className={cn(
            "block px-4 py-2 text-sm text-gray-700  transition-all",
            activeMenu === "highToLow" ? "bg-gray-200" : "hover:bg-gray-50"
          )}
          role="menuitem"
          tabIndex="-1"
          onClick={(e) => {
            e.stopPropagation();
            handleClick("highToLow");
          }}
        >
          High to Low
        </a>
      </div>
    </div>
  );
}
