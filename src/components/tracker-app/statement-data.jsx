import Bin from "@/components/icons/bin";
import Pencil from "@/components/icons/pencil";
import Button from "@/components/ui/button";
import { formatDateToLocal } from "@/lib/utils";

export default function StatementData({ transaction, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center py-2 relative group cursor-pointer">
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
          <Button
            className="hover:text-teal-600"
            role="button"
            title="Edit Button"
            onClick={() => onEdit(transaction)}
          >
            <Pencil />
          </Button>

          <Button
            className="hover:text-red-600"
            role="button"
            title="Delete"
            onClick={() => {
              if (
                confirm(
                  `\nDo you want to delete ${transaction.category}: ${transaction.amount} in ${transaction.type}?`
                )
              ) {
                onDelete(transaction.id);
              }
            }}
          >
            <Bin />
          </Button>
        </div>
      </div>
    </div>
  );
}
