import { useMemo, useState } from "react";
import { AsyncState } from "../Components/UI/AsyncState";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchCostRows } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { expenseColumns } from "./Expenses/expenseColumns";

const Costs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(fetchCostRows, []);
  const rows = data ?? [];

  const filtered = useMemo(
    () =>
      rows.filter((expense) =>
        [expense.container, expense.paidTo, expense.category]
          .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [rows, searchQuery],
  );
  const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Container Costs" subtitle="هزینه‌ها کانتینر — Customs, commissions, unloading, border and license fees." action="Add Cost Expense" />
      <StatGrid stats={[
        { label: "Visible Records", value: filtered.length },
        { label: "Total Costs", value: `$${total.toLocaleString()}`, tone: "red" },
        { label: "Customs", value: rows.filter((e) => e.category.toLowerCase().includes("customs")).length, tone: "blue" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search costs..." />
      <AsyncState loading={loading} error={error} empty={!filtered.length}>
        <DataTable columns={expenseColumns} rows={filtered} />
      </AsyncState>
    </div>
  );
};

export default Costs;
