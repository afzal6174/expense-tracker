import InputCheckbox from "@/components/ui/input-checkbox";
import { useState } from "react";

export default function FilterMenu({ items, onFilter }) {
  const [checkedItems, setCheckedItems] = useState([]);

  function handleChange(e) {
    const { value } = e.target;
    const updatedCheckedItems = checkedItems.includes(value)
      ? checkedItems.filter((item) => item !== value)
      : [...checkedItems, value];

    setCheckedItems(updatedCheckedItems);
    onFilter(updatedCheckedItems);
  }

  return (
    <div
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="filter-button"
      tabIndex="-1"
    >
      <div className="py-1" role="none">
        {items.map((item) => (
          <label
            key={item}
            className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
          >
            <InputCheckbox
              id={item}
              name={item}
              value={item}
              onChange={handleChange}
              className="h-4 w-4 rounded-md text-gray-600"
            />
            <span className="ml-2">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
