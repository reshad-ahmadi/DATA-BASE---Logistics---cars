import { useMemo, useState } from "react";
import { AsyncState } from "../Components/UI/AsyncState";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchBorderRows } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { borderColumns } from "./Borders/borderColumns";

const Borders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(fetchBorderRows, []);
  const rows = data ?? [];

  const filtered = useMemo(
    () =>
      rows.filter((border) =>
        [border.companyName, border.companyNameDA, border.borderName, border.borderNameDA]
          .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [rows, searchQuery],
  );
  const fees = filtered.reduce((sum, border) => sum + border.totalFees, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Border Logistics & Clearance" subtitle="مرزها و گمرکات — Border payments, statuses and agency balances." action="Update Border Status" />
      <StatGrid stats={[
        { label: "Containers at Borders", value: filtered.reduce((sum, b) => sum + b.containersCount, 0) },
        { label: "Total Border Fees", value: `$${fees.toLocaleString()}`, tone: "red" },
        { label: "Clearance Partners", value: filtered.length, tone: "blue" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search borders..." />
      <AsyncState loading={loading} error={error} empty={!filtered.length}>
        <DataTable columns={borderColumns} rows={filtered} />
      </AsyncState>
    </div>
  );
};

export default Borders;
