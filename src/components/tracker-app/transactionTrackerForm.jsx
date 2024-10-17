import Field from "@/components/ui/form-field";
import InputDate from "@/components/ui/input-date";
import InputNumber from "@/components/ui/input-number";
import Select from "@/components/ui/select";
import { expenseCategories, incomeCategories } from "@/lib/data/categories";
import { transactionTrackerFormFields } from "@/lib/data/form";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function TransactionTrackerForm({ onSave, dataForEditing }) {
  const [transaction, setTransaction] = useState(
    dataForEditing || {
      id: crypto.randomUUID(),
      type: "expense",
      category: "",
      amount: "",
      date: "",
    }
  );
  const [activeTab, setActiveTab] = useState(transaction.type);

  const categoriesMap = {
    income: incomeCategories,
    expense: expenseCategories,
  };

  function handleTabChange(tabType) {
    setActiveTab(tabType);
    setTransaction(reset(tabType));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  }

  function reset(tabType) {
    return {
      id: crypto.randomUUID(),
      type: tabType,
      category: "",
      amount: "",
      date: "",
    };
  }

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
        <div
          className={cn(
            "cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900",
            activeTab === "expense" ? "active" : null
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleTabChange("expense");
          }}
        >
          Expense
        </div>
        <div
          className={cn(
            "cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900",
            activeTab === "income" ? "active" : null
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleTabChange("income");
          }}
        >
          Income
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(transaction);
          setTransaction(reset(activeTab));
        }}
      >
        {transactionTrackerFormFields.map((field) => {
          if (field.type === "select") {
            return (
              <Field key={field.id} className="mt-3">
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {field.label}
                </label>
                <div className="mt-2">
                  <Select
                    id={field.id}
                    name={field.name}
                    value={transaction.category}
                    onChange={handleChange}
                    required
                    options={categoriesMap[activeTab]}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </Field>
            );
          }

          if (field.type === "input-number") {
            return (
              <Field key={field.id} className="mt-3">
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {field.label}
                </label>
                <div className="mt-2">
                  <InputNumber
                    id={field.id}
                    name={field.name}
                    value={transaction.amount}
                    min="0"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </Field>
            );
          }

          if (field.type === "input-date") {
            return (
              <Field key={field.id} className="mt-3">
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {field.label}
                </label>
                <div className="mt-2">
                  <InputDate
                    id={field.id}
                    name={field.name}
                    value={transaction.date}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </Field>
            );
          }
        })}

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
