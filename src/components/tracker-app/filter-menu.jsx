import InputCheckbox from "@/components/ui/input-checkbox";

export default function FilterMenu({
  items,
  onFilter,
  showFilterMenu,
  checkedItems,
}) {
  return (
    <>
      {showFilterMenu && (
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
                  onChange={() => onFilter(item)}
                  checked={checkedItems.includes(item)}
                  className="h-4 w-4 rounded-md text-gray-600"
                />
                <span className="ml-2">{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
