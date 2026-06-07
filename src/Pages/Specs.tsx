import { useMemo, useState } from "react";
import { AsyncState } from "../Components/UI/AsyncState";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchSpecRows } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { specColumns } from "./Specs/specColumns";

const Specs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(fetchSpecRows, []);
  const rows = data ?? [];

  const filtered = useMemo(
    () =>
      rows.filter((container) =>
        [container.id, container.containerNo, container.blNo, container.customer]
          .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [rows, searchQuery],
  );
  const purchase = filtered.reduce((sum, container) => sum + container.purchasePrice, 0);
  const sales = filtered.reduce((sum, container) => sum + container.sellingPrice, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Specs & Prices" subtitle="مشخصات و قیمت‌ها — BL numbers, container specs, purchase and sales pricing." action="Add Spec" />
      <StatGrid stats={[
        { label: "Purchase Investment", value: `$${purchase.toLocaleString()}`, tone: "red" },
        { label: "Sales Value", value: `$${sales.toLocaleString()}`, tone: "blue" },
        { label: "Expected Profit", value: `$${(sales - purchase).toLocaleString()}`, tone: "green" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search specs..." />
      <AsyncState loading={loading} error={error} empty={!filtered.length}>
        <DataTable columns={specColumns} rows={filtered} />
      </AsyncState>
    </div>
  );
};

export default Specs;
