import type { Column } from "../../Components/UI/DataTable";
import { expenseCategoryColors } from "../../data/expensesData";

type ExpenseRow = {
  id: string; category: string; categoryDA: string;
  container: string; amount: number; date: string; paidTo: string;
};

export const expenseColumns: Column<ExpenseRow>[] = [
  { key: "id", header: "ID", render: (row) => <span className="font-semibold text-blue-600">{row.id}</span> },
  {
    key: "category",
    header: "Category",
    render: (row) => (
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${expenseCategoryColors[row.category]}`}>
        {row.category}
      </span>
    ),
  },
  { key: "dari", header: "Dari", render: (row) => row.categoryDA },
  { key: "container", header: "Container", render: (row) => row.container },
  { key: "paid", header: "Paid To", render: (row) => row.paidTo },
  { key: "amount", header: "Amount", render: (row) => `$${row.amount.toLocaleString()}` },
  { key: "date", header: "Date", render: (row) => row.date },
];
