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

  function sortTransactions(arr, order = "asc") {
    return [...arr].sort((a, b) => {
      const amountA = Number(a.amount);
      const amountB = Number(b.amount);
      return order === "asc" ? amountA - amountB : amountB - amountA;
    });
  }

  function handleIncomeSort(sortOrder) {
    if (!sortOrder) {
      setIncomeStatements(defaultIncomeStatements);
    } else {
      const sortedIncomeStatements = sortTransactions(
        incomeStatements,
        sortOrder === "lowToHigh" ? "asc" : "desc"
      );
      setIncomeStatements(sortedIncomeStatements);
    }
  }

  function handleExpenseSort(sortOrder) {
    if (!sortOrder) {
      setExpenseStatements(defaultExpenseStatements);
    } else {
      const sortedExpenseStatements = sortTransactions(
        expenseStatements,
        sortOrder === "lowToHigh" ? "asc" : "desc"
      );
      setExpenseStatements(sortedExpenseStatements);
    }
  }

  function handleIncomeFilter(checkedIncomeCategories) {
    if (checkedIncomeCategories.length === 0) {
      setIncomeStatements(defaultIncomeStatements);
    } else {
      const filteredIncome = defaultIncomeStatements.filter((transaction) =>
        checkedIncomeCategories.includes(transaction.category)
      );
      setIncomeStatements(filteredIncome);
    }
  }

  function handleExpenseFilter(checkedExpenseCategories) {
    if (checkedExpenseCategories.length === 0) {
      setExpenseStatements(defaultExpenseStatements);
    } else {
      const filteredExpense = defaultExpenseStatements.filter((transaction) =>
        checkedExpenseCategories.includes(transaction.category)
      );
      setExpenseStatements(filteredExpense);
    }
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
            onEdit={(transaction) => setDataForEditing(transaction)}
            onDelete={(transactionId) => handleDelete(transactionId, "income")}
            onSort={handleIncomeSort}
            onFilter={handleIncomeFilter}
          />
          <Statement
            title="Expense"
            type="expense"
            statement={expenseStatements}
            onEdit={(transaction) => setDataForEditing(transaction)}
            onDelete={(transactionId) => handleDelete(transactionId, "expense")}
            onSort={handleExpenseSort}
            onFilter={handleExpenseFilter}
          />
        </div>
      </div>
    </>
  );
}
