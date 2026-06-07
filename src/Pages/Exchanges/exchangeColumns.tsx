import type { Column } from "../../Components/UI/DataTable";
import type { ExchangeRow } from "../../api/mappers";

export const exchangeColumns: Column<ExchangeRow>[] = [
  { key: "id", header: "ID", render: (row) => <span className="font-semibold text-blue-600">{row.id}</span> },
  { key: "date", header: "Date", render: (row) => row.date },
  { key: "exchange", header: "Exchange", render: (row) => `${row.exchangeName} / ${row.exchangeNameDA}` },
  {
    key: "type",
    header: "Type",
    render: (row) => <span className={row.type === "incoming" ? "text-green-600" : "text-red-600"}>{row.type}</span>,
  },
  { key: "source", header: "Source", render: (row) => `${row.sourceAmount.toLocaleString()} ${row.sourceCurrency}` },
  { key: "target", header: "Target", render: (row) => `${row.targetAmount.toLocaleString()} ${row.targetCurrency}` },
  { key: "rate", header: "Rate", render: (row) => row.rate.toLocaleString() },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
        {row.status}
      </span>
    ),
  },
];
