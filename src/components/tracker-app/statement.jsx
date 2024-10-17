import Bin from "@/components/icons/bin";
import Expense from "@/components/icons/expense";
import Filter from "@/components/icons/filter";
import Income from "@/components/icons/income";
import Pencil from "@/components/icons/pencil";
import Sort from "@/components/icons/sort";
import FilterMenu from "@/components/tracker-app/filter-menu";
import SortingMenu from "@/components/tracker-app/sorting-menu";
import { expenseCategories, incomeCategories } from "@/lib/data/categories";
import { cn, formatDateToLocal } from "@/lib/utils";
import { useState } from "react";

const iconMap = {
  income: Income,
  expense: Expense,
};
const categoriesMap = {
  income: incomeCategories,
  expense: expenseCategories,
};

export default function Statement({
  title,
  type,
  statement,
  onEdit,
  onDelete,
  onSort,
  onFilter,
}) {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const Icon = iconMap[type];

  function handleShowSortMenu() {
    setShowSortMenu(!showSortMenu);
    setShowFilterMenu(false);
  }

  function handleShowFilterMenu() {
    setShowFilterMenu(!showFilterMenu);
    setShowSortMenu(false);
  }

  return (
    <div className="border rounded-md relative">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-10 w-10 text-white rounded-md text-center object-center place-content-center text-base",
              type == "income" ? "bg-teal-600" : "bg-pink-600"
            )}
          >
            <Icon className="mx-auto" />
          </div>

          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex gap-1">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                aria-expanded={showSortMenu}
                aria-haspopup={showSortMenu}
                onClick={handleShowSortMenu}
              >
                <Sort className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending" />
              </button>
            </div>

            {showSortMenu && <SortingMenu onSort={onSort} />}
          </div>

          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                aria-expanded={showFilterMenu}
                aria-haspopup={showFilterMenu}
                onClick={handleShowFilterMenu}
              >
                <Filter className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-alt" />
              </button>
            </div>

            {showFilterMenu && (
              <FilterMenu items={categoriesMap[type]} onFilter={onFilter} />
            )}
          </div>
        </div>
      </div>

      <div className="p-4 divide-y">
        {statement.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center py-2 relative group cursor-pointer"
          >
            <div>
              <h3 className="text-base font-medium leading-7 text-gray-600">
                {transaction.category}
              </h3>
              <p className="text-xs text-gray-600">
                {formatDateToLocal(transaction.date)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                BDT {transaction.amount}
              </p>
              <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all flex gap-1">
                <button
                  className="hover:text-teal-600"
                  role="button"
                  title="Edit Button"
                  onClick={() => onEdit(transaction)}
                >
                  <Pencil />
                </button>

                <button
                  className="hover:text-red-600"
                  role="button"
                  title="Delete"
                  onClick={() => onDelete(transaction.id)}
                >
                  <Bin />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
