import BalanceStats from "@/components/tracker-app/balance-stats";
import Statement from "@/components/tracker-app/statement";
import TransactionTrackerForm from "@/components/tracker-app/transactionTrackerForm";
import { useState } from "react";

export default function TrackerApp() {
  const [dataForEditing, setDataForEditing] = useState(null);
  const [incomeStatements, setIncomeStatements] = useState([]);
  const [expenseStatements, setExpenseStatements] = useState([]);
  const [defaultIncomeStatements, setDefaultIncomeStatements] = useState([]);
  const [defaultExpenseStatements, setDefaultExpenseStatements] = useState([]);
  const [activeTab, setActiveTab] = useState("expense");
  const [checkedIncomeCategories, setCheckedIncomeCategories] = useState([]);
  const [checkedExpenseCategories, setCheckedExpenseCategories] = useState([]);
  const [activeIncomeSort, setActiveIncomeSort] = useState(null);
  const [activeExpenseSort, setActiveExpenseSort] = useState(null);

  function handleSave(transactionToSave) {
    const isIncome = transactionToSave.type === "income";
    const defaultStatements = isIncome
      ? defaultIncomeStatements
      : defaultExpenseStatements;
    const setStatements = isIncome ? setIncomeStatements : setExpenseStatements;
    const setDefaultStatements = isIncome
      ? setDefaultIncomeStatements
      : setDefaultExpenseStatements;
    const setActiveSort = isIncome ? setActiveIncomeSort : setActiveExpenseSort;
    const setCheckedCategories = isIncome
      ? setCheckedIncomeCategories
      : setCheckedExpenseCategories;

    setActiveSort(null);
    setCheckedCategories([]);

    if (dataForEditing) {
      const updatedStatements = defaultStatements.map((oldTransaction) =>
        oldTransaction.id === transactionToSave.id
          ? transactionToSave
          : oldTransaction
      );
      setStatements(updatedStatements);
      setDefaultStatements(updatedStatements);

      setDataForEditing(null);
    } else {
      const newStatements = [...defaultStatements, transactionToSave];
      setStatements(newStatements);
      setDefaultStatements(newStatements);
    }
  }

  function handleDelete(transactionId, type) {
    if (type === "income") {
      const updatedIncomeStatements = incomeStatements.filter(
        (transaction) => transaction.id !== transactionId
      );
      setIncomeStatements(updatedIncomeStatements);
      setDefaultIncomeStatements(updatedIncomeStatements);
    } else {
      const updatedExpenseStatements = expenseStatements.filter(
        (transaction) => transaction.id !== transactionId
      );
      setExpenseStatements(updatedExpenseStatements);
      setDefaultExpenseStatements(updatedExpenseStatements);
    }
  }

  function handleEdit(transaction) {
    setDataForEditing(transaction);
    setActiveTab(transaction.type);
  }

  function sortTransactions(arr, order = "asc") {
    return [...arr].sort((a, b) => {
      const amountA = Number(a.amount);
      const amountB = Number(b.amount);
      return order === "asc" ? amountA - amountB : amountB - amountA;
    });
  }

  function handleIncomeSort(sortOrder) {
    const newActiveIncomeSort =
      activeIncomeSort === sortOrder ? null : sortOrder;
    setActiveIncomeSort(newActiveIncomeSort);

    if (!newActiveIncomeSort) {
      setIncomeStatements(defaultIncomeStatements);
      setCheckedIncomeCategories([]);
    } else {
      const sortedIncomeStatements = sortTransactions(
        incomeStatements,
        sortOrder === "lowToHigh" ? "asc" : "desc"
      );
      setIncomeStatements(sortedIncomeStatements);
    }
  }

  function handleExpenseSort(sortOrder) {
    const newActiveExpenseSort =
      activeExpenseSort === sortOrder ? null : sortOrder;
    setActiveExpenseSort(newActiveExpenseSort);

    if (!newActiveExpenseSort) {
      setExpenseStatements(defaultExpenseStatements);
      setCheckedExpenseCategories([]);
    } else {
      const sortedExpenseStatements = sortTransactions(
        expenseStatements,
        sortOrder === "lowToHigh" ? "asc" : "desc"
      );
      setExpenseStatements(sortedExpenseStatements);
    }
  }

  function insertcheckedCategories(newCategory, type) {
    if (type === "income") {
      const updatedCategories = checkedIncomeCategories.includes(newCategory)
        ? checkedIncomeCategories.filter((category) => category !== newCategory)
        : [...checkedIncomeCategories, newCategory];

      setCheckedIncomeCategories(updatedCategories);
      handleIncomeFilter(updatedCategories);
    } else {
      if (type === "expense") {
        const updatedCategories = checkedExpenseCategories.includes(newCategory)
          ? checkedExpenseCategories.filter(
              (category) => category !== newCategory
            )
          : [...checkedExpenseCategories, newCategory];

        setCheckedExpenseCategories(updatedCategories);
        handleExpenseFilter(updatedCategories);
      }
    }
  }

  function handleIncomeFilter(categories) {
    if (categories.length === 0) {
      setIncomeStatements(defaultIncomeStatements);
      setActiveIncomeSort(null);
    } else {
      const filteredIncome = defaultIncomeStatements.filter((transaction) =>
        categories.includes(transaction.category)
      );
      setIncomeStatements(filteredIncome);
    }
  }

  function handleExpenseFilter(categories) {
    if (categories.length === 0) {
      setExpenseStatements(defaultExpenseStatements);
      setActiveExpenseSort(null);
    } else {
      const filteredExpense = defaultExpenseStatements.filter((transaction) =>
        categories.includes(transaction.category)
      );
      setExpenseStatements(filteredExpense);
    }
  }

  function handleEditEscape() {
    setDataForEditing(null);
  }

  const totalIncomeAmount = incomeStatements.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );
  const totalExpenseAmount = expenseStatements.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  return (
    <>
      <TransactionTrackerForm
        key={dataForEditing ? dataForEditing.id : "new"}
        onSave={handleSave}
        dataForEditing={dataForEditing}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEditEscape={handleEditEscape}
      />
      <div className="lg:col-span-2">
        <BalanceStats
          totalIncomeAmount={totalIncomeAmount}
          totalExpenseAmount={totalExpenseAmount}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <Statement
            title="Income"
            type="income"
            statement={incomeStatements}
            onEdit={handleEdit}
            onDelete={(transactionId) => handleDelete(transactionId, "income")}
            onSort={handleIncomeSort}
            onFilter={(category) => insertcheckedCategories(category, "income")}
            checkedItems={checkedIncomeCategories}
            activeSort={activeIncomeSort}
          />
          <Statement
            title="Expense"
            type="expense"
            statement={expenseStatements}
            onEdit={handleEdit}
            onDelete={(transactionId) => handleDelete(transactionId, "expense")}
            onSort={handleExpenseSort}
            onFilter={(category) =>
              insertcheckedCategories(category, "expense")
            }
            checkedItems={checkedExpenseCategories}
            activeSort={activeExpenseSort}
          />
        </div>
      </div>
    </>
  );
}
