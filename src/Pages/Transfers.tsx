import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { containersListData } from "../data/containersData";
import { containerColumns } from "./Containers/containerColumns";

const Transfers = () => {
  const [params] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const origin = params.get("origin") || "All";
  const filtered = containersListData.filter((container) => {
    const matchesOrigin = origin === "All" || container.origin === origin;
    const matchesSearch = [container.id, container.containerNo, container.customer]
      .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesOrigin && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Container Transfers" subtitle="انتقالات کانتینر — China, India, Dubai to Afghanistan routes." action="Add Transfer Route" />
      <StatGrid stats={[
        { label: "Total Transfers", value: filtered.length },
        { label: "In Transit", value: filtered.filter((c) => c.status === "In Transit").length, tone: "blue" },
        { label: "Cleared / Delivered", value: filtered.filter((c) => ["Cleared", "Delivered"].includes(c.status)).length, tone: "green" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search transfer..." />
      <DataTable columns={containerColumns} rows={filtered} />
    </div>
  );
};

export default Transfers;
