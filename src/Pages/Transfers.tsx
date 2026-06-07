import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AsyncState } from "../Components/UI/AsyncState";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchContainerRows } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { containerColumns } from "./Containers/containerColumns";

const Transfers = () => {
  const [params] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(fetchContainerRows, []);
  const rows = data ?? [];
  const origin = params.get("origin") || "All";

  const filtered = useMemo(
    () =>
      rows.filter((container) => {
        const matchesOrigin = origin === "All" || container.origin === origin;
        const matchesSearch = [container.id, container.containerNo, container.customer]
          .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesOrigin && matchesSearch;
      }),
    [rows, origin, searchQuery],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Container Transfers" subtitle="انتقالات کانتینر — China, India, Dubai to Afghanistan routes." action="Add Transfer Route" />
      <StatGrid stats={[
        { label: "Total Transfers", value: filtered.length },
        { label: "In Transit", value: filtered.filter((c) => c.status === "In Transit").length, tone: "blue" },
        { label: "Cleared / Delivered", value: filtered.filter((c) => ["Cleared", "Delivered"].includes(c.status)).length, tone: "green" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search transfer..." />
      <AsyncState loading={loading} error={error} empty={!filtered.length}>
        <DataTable columns={containerColumns} rows={filtered} />
      </AsyncState>
    </div>
  );
};

export default Transfers;
