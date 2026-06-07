import { useState } from "react";
import { DataTable } from "../Components/UI/DataTable";
import { FilterBar } from "../Components/UI/FilterBar";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { ExchangeFilters } from "./Exchanges/ExchangeFilters";
import { exchangesData } from "./Exchanges/exchangeData";
import { exchangeColumns } from "./Exchanges/exchangeColumns";

const Exchanges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [exchangeFilter, setExchangeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const filtered = exchangesData.filter((exchange) => {
    const text = [exchange.exchangeName, exchange.exchangeNameDA, exchange.notes, exchange.notesDA];
    const matchesSearch = text.some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExchange = exchangeFilter === "All" || exchange.exchangeName === exchangeFilter;
    const matchesStatus = statusFilter === "All" || exchange.status === statusFilter;
    return matchesSearch && matchesExchange && matchesStatus;
  });
  const usd = filtered.filter((exchange) => exchange.sourceCurrency === "USD")
    .reduce((sum, exchange) => sum + exchange.sourceAmount, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Currency Exchanges" subtitle="حسابات صرافی‌ها — Hawala, received, paid and exchange balances." action="Add Exchange" />
      <StatGrid stats={[
        { label: "USD Volume", value: `$${usd.toLocaleString()}` },
        { label: "Transactions", value: filtered.length, tone: "blue" },
        { label: "Pending", value: filtered.filter((e) => e.status === "pending").length, tone: "red" },
      ]} />
      <FilterBar search={searchQuery} onSearch={setSearchQuery} placeholder="Search exchanges..." />
      <ExchangeFilters exchange={exchangeFilter} status={statusFilter} setExchange={setExchangeFilter} setStatus={setStatusFilter} />
      <DataTable columns={exchangeColumns} rows={filtered} />
    </div>
  );
};

export default Exchanges;
