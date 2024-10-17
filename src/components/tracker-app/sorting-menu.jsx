export default function SortingMenu({ onSort }) {
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
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
          role="menuitem"
          tabIndex="-1"
          onClick={() => onSort("lowToHigh")}
        >
          Low to High
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
          role="menuitem"
          tabIndex="-1"
          onClick={() => onSort("highToLow")}
        >
          High to Low
        </a>
      </div>
    </div>
  );
}
