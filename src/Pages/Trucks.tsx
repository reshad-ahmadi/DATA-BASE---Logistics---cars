import { useState } from "react";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { expensesData } from "../data/expensesData";
import { expenseColumns } from "./Expenses/expenseColumns";

const truckCategories = ["Truck Fare", "Crane Fee", "Forklift"];

const Trucks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const rows = expensesData.filter((expense) => truckCategories.includes(expense.category));
  const filtered = rows.filter((expense) =>
    [expense.container, expense.paidTo, expense.category]
      .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Truck Accounts" subtitle="حسابات موتر — Truck freight, crane, forklift and loading expenses." action="Add Truck Record" />
      <StatGrid stats={[
        { label: "Truck Records", value: filtered.length },
        { label: "Total Truck Costs", value: `$${total.toLocaleString()}`, tone: "red" },
        { label: "Truck Fare Items", value: rows.filter((e) => e.category === "Truck Fare").length, tone: "blue" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search truck expenses..." />
      <DataTable columns={expenseColumns} rows={filtered} />
    </div>
  );
};

export default Trucks;
