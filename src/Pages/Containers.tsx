import { useState } from "react";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { containersListData } from "../data/containersData";
import { containerColumns } from "./Containers/containerColumns";

const Containers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = containersListData.filter((container) =>
    [container.id, container.containerNo, container.customer]
      .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
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
        { label: "Total Containers", value: containersListData.length },
        { label: "Visible", value: filtered.length, tone: "blue" },
        { label: "Delivered", value: containersListData.filter((c) => c.status === "Delivered").length, tone: "green" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search by ID, container no, or customer..." />
      <DataTable columns={containerColumns} rows={filtered} />
    </div>
  );
};

export default Containers;
