import { useState } from "react";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { expensesData } from "../data/expensesData";
import { expenseColumns } from "./Expenses/expenseColumns";

const costCategories = ["Customs Fee", "Commission Fee", "Unloading Fee", "Border Fee", "License Fee"];

const Costs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const rows = expensesData.filter((expense) => costCategories.includes(expense.category));
  const filtered = rows.filter((expense) =>
    [expense.container, expense.paidTo, expense.category]
      .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Container Costs" subtitle="هزینه‌ها کانتینر — Customs, commissions, unloading, border and license fees." action="Add Cost Expense" />
      <StatGrid stats={[
        { label: "Visible Records", value: filtered.length },
        { label: "Total Costs", value: `$${total.toLocaleString()}`, tone: "red" },
        { label: "Customs", value: rows.filter((e) => e.category === "Customs Fee").length, tone: "blue" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search costs..." />
      <DataTable columns={expenseColumns} rows={filtered} />
    </div>
  );
};

export default Costs;
