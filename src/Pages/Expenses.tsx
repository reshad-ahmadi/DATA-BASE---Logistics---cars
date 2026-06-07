import { useState } from "react";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { expensesData } from "../data/expensesData";
import { expenseColumns } from "./Expenses/expenseColumns";

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = expensesData.filter((expense) =>
    [expense.container, expense.paidTo, expense.category, expense.categoryDA]
      .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Expenses & Costs" subtitle="هزینه‌ها — Track all operational and container expenses." action="Add Expense" />
      <StatGrid stats={[
        { label: "Expense Records", value: filtered.length },
        { label: "Total Expenses", value: `$${total.toLocaleString()}`, tone: "red" },
        { label: "Categories", value: new Set(filtered.map((e) => e.category)).size, tone: "blue" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search by container, category or recipient..." />
      <DataTable columns={expenseColumns} rows={filtered} />
    </div>
  );
};

export default Expenses;
