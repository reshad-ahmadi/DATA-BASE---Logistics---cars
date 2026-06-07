import { useMemo, useState } from "react";
import { AsyncState } from "../Components/UI/AsyncState";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchTruckRows } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { expenseColumns } from "./Expenses/expenseColumns";

const Trucks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(fetchTruckRows, []);
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
      <PageHeader title="Truck Accounts" subtitle="حسابات موتر — Truck freight, crane, forklift and loading expenses." action="Add Truck Record" />
      <StatGrid stats={[
        { label: "Truck Records", value: filtered.length },
        { label: "Total Truck Costs", value: `$${total.toLocaleString()}`, tone: "red" },
        { label: "Truck Fare Items", value: rows.filter((e) => e.category.toLowerCase().includes("truck")).length, tone: "blue" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search truck expenses..." />
      <AsyncState loading={loading} error={error} empty={!filtered.length}>
        <DataTable columns={expenseColumns} rows={filtered} />
      </AsyncState>
    </div>
  );
};

export default Trucks;
