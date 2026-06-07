import { useMemo, useState } from "react";
import { AsyncState } from "../Components/UI/AsyncState";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchCustomerRows } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { customerColumns } from "./Customers/customerColumns";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(fetchCustomerRows, []);
  const rows = data ?? [];

  const filtered = useMemo(
    () =>
      rows.filter((customer) =>
        [customer.name, customer.nameDA, customer.phone]
          .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [rows, searchQuery],
  );
  const balance = filtered.reduce((sum, customer) => sum + customer.balance, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Customer Accounts" subtitle="حسابات مشتریان — Invoices, payments, ledgers and balances." action="Add Customer" />
      <StatGrid stats={[
        { label: "Customers", value: filtered.length },
        { label: "Containers", value: filtered.reduce((sum, c) => sum + c.containers, 0), tone: "blue" },
        { label: "Balance", value: `$${balance.toLocaleString()}`, tone: "green" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search by name or phone..." />
      <AsyncState loading={loading} error={error} empty={!filtered.length}>
        <DataTable columns={customerColumns} rows={filtered} />
      </AsyncState>
    </div>
  );
};

export default Customers;
