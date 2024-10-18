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

  function handleSave(transactionToSave) {
    if (dataForEditing) {
      if (transactionToSave.type === "income") {
        const updatedIncomeStatements = incomeStatements.map((oldTransaction) =>
          oldTransaction.id === transactionToSave.id
            ? transactionToSave
            : oldTransaction
        );
        setIncomeStatements(updatedIncomeStatements);
        setDefaultIncomeStatements(updatedIncomeStatements);
      } else {
        const updatedExpenseStatements = expenseStatements.map(
          (oldTransaction) =>
            oldTransaction.id === transactionToSave.id
              ? transactionToSave
              : oldTransaction
        );
        setExpenseStatements(updatedExpenseStatements);
        setDefaultExpenseStatements(updatedExpenseStatements);
      }
      setDataForEditing(null);
    } else {
      if (transactionToSave.type === "income") {
        const newIncomeStatements = [...incomeStatements, transactionToSave];
        setIncomeStatements(newIncomeStatements);
        setDefaultIncomeStatements(newIncomeStatements);
      } else {
        const newExpenseStatements = [...expenseStatements, transactionToSave];
        setExpenseStatements(newExpenseStatements);
        setDefaultExpenseStatements(newExpenseStatements);
      }
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

  function handleIncomeSort(sortOrder = null, checkedIncomeCategories = []) {
    if (!sortOrder && checkedIncomeCategories.length === 0) {
      setIncomeStatements(defaultIncomeStatements);
    } else {
      let sortedIncomeStatements = incomeStatements;

      if (checkedIncomeCategories.length > 0) {
        sortedIncomeStatements = defaultIncomeStatements.filter((transaction) =>
          checkedIncomeCategories.includes(transaction.category)
        );
      }

      if (sortOrder) {
        sortedIncomeStatements = sortTransactions(
          sortedIncomeStatements,
          sortOrder === "lowToHigh" ? "asc" : "desc"
        );
      }

      setIncomeStatements(sortedIncomeStatements);
    }
  }

  function handleExpenseSort(sortOrder = null, checkedExpenseCategories = []) {
    if (!sortOrder && checkedExpenseCategories.length === 0) {
      setExpenseStatements(defaultExpenseStatements);
    } else {
      let sortedExpenseStatements = expenseStatements;

      if (checkedExpenseCategories.length > 0) {
        sortedExpenseStatements = defaultExpenseStatements.filter(
          (transaction) =>
            checkedExpenseCategories.includes(transaction.category)
        );
      }

      if (sortOrder) {
        sortedExpenseStatements = sortTransactions(
          sortedExpenseStatements,
          sortOrder === "lowToHigh" ? "asc" : "desc"
        );
      }

      setExpenseStatements(sortedExpenseStatements);
    }
  }

  function handleIncomeFilter(checkedIncomeCategories = [], sortOrder = null) {
    if (checkedIncomeCategories.length === 0 && !sortOrder) {
      setIncomeStatements(defaultIncomeStatements);
    } else {
      let filteredIncome = defaultIncomeStatements.filter((transaction) =>
        checkedIncomeCategories.includes(transaction.category)
      );

      if (sortOrder) {
        filteredIncome = sortTransactions(
          filteredIncome,
          sortOrder === "lowToHigh" ? "asc" : "desc"
        );
      }

      setIncomeStatements(filteredIncome);
    }
  }

  function handleExpenseFilter(
    checkedExpenseCategories = [],
    sortOrder = null
  ) {
    if (checkedExpenseCategories.length === 0 && !sortOrder) {
      setExpenseStatements(defaultExpenseStatements);
    } else {
      let filteredExpense = defaultExpenseStatements.filter((transaction) =>
        checkedExpenseCategories.includes(transaction.category)
      );

      if (sortOrder) {
        filteredExpense = sortTransactions(
          filteredExpense,
          sortOrder === "lowToHigh" ? "asc" : "desc"
        );
      }

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
        activeTab={activeTab} // Pass activeTab as a prop
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
            onFilter={handleIncomeFilter}
          />
          <Statement
            title="Expense"
            type="expense"
            statement={expenseStatements}
            onEdit={handleEdit}
            onDelete={(transactionId) => handleDelete(transactionId, "expense")}
            onSort={handleExpenseSort}
            onFilter={handleExpenseFilter}
          />
        </div>
      </div>
    </>
  );
}
