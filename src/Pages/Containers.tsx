import { useMemo, useState } from "react";
import { AsyncState } from "../Components/UI/AsyncState";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchContainerRows } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { containerColumns } from "./Containers/containerColumns";

const Containers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(fetchContainerRows, []);
  const rows = data ?? [];

  const filtered = useMemo(
    () =>
      rows.filter((container) =>
        [container.id, container.containerNo, container.customer]
          .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [rows, searchQuery],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader
        title="Containers"
        subtitle="مدیریت کانتینرها — Manage and track all registered containers."
        action="Add New Container"
        actionTo="/containers/new"
      />
      <StatGrid stats={[
        { label: "Total Containers", value: rows.length },
        { label: "Visible", value: filtered.length, tone: "blue" },
        { label: "Delivered", value: rows.filter((c) => c.status === "Delivered").length, tone: "green" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search by ID, container no, or customer..." />
      <AsyncState loading={loading} error={error} empty={!filtered.length}>
        <DataTable columns={containerColumns} rows={filtered} />
      </AsyncState>
    </div>
  );
};

export default Containers;
