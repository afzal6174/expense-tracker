import Expense from "@/components/icons/expense";
import Filter from "@/components/icons/filter";
import Income from "@/components/icons/income";
import Sort from "@/components/icons/sort";
import FilterMenu from "@/components/tracker-app/filter-menu";
import NotFound from "@/components/tracker-app/not-found";
import SortingMenu from "@/components/tracker-app/sorting-menu";
import StatementData from "@/components/tracker-app/statement-data";
import { expenseCategories, incomeCategories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
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
        {statement.length > 0 ? (
          statement.map((transaction) => (
            <StatementData
              transaction={transaction}
              key={transaction.id}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <NotFound title={title} />
        )}
      </div>
    </div>
  );
}
