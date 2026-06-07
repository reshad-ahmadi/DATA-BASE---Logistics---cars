import { useMemo, useState } from "react";
import { AsyncState } from "../Components/UI/AsyncState";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchContainerRows } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { containerColumns } from "./Containers/containerColumns";

const Logistics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(fetchContainerRows, []);
  const rows = data ?? [];

  const filtered = useMemo(
    () =>
      rows.filter((container) =>
        [container.id, container.containerNo, container.destination, container.customer]
          .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [rows, searchQuery],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Logistics & Loading" subtitle="لجستیک و بارگیری — Border loading, customs clearance and domestic transport." action="Update Logistics" />
      <StatGrid stats={[
        { label: "Tracking Containers", value: filtered.length },
        { label: "In Customs", value: filtered.filter((c) => c.status === "Customs").length, tone: "red" },
        { label: "Transit / Border", value: filtered.filter((c) => ["In Transit", "At Border", "Loaded"].includes(c.status)).length, tone: "blue" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search logistics..." />
      <AsyncState loading={loading} error={error} empty={!filtered.length}>
        <DataTable columns={containerColumns} rows={filtered} />
      </AsyncState>
    </div>
  );
};

export default Logistics;
