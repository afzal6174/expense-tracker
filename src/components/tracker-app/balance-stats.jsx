import Stat from "@/components/tracker-app/stat";

export default function BalanceStats({
  totalIncomeAmount = 0,
  totalExpenseAmount = 0,
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-1 text-center lg:grid-cols-3 divide-x-2 border rounded-md overflow-hidden">
          <Stat
            title="Balance"
            value={totalIncomeAmount - totalExpenseAmount}
          />
          <Stat title="Total Income" value={totalIncomeAmount} />
          <Stat title="Total Expense" value={totalExpenseAmount} />
        </dl>
      </div>
    </div>
  );
}
