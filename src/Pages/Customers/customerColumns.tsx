import type { Column } from "../../Components/UI/DataTable";

type CustomerRow = {
  id: string; name: string; nameDA: string; phone: string;
  containers: number; totalSales: number; balance: number;
};

export const customerColumns: Column<CustomerRow>[] = [
  { key: "id", header: "ID", render: (row) => <span className="font-semibold text-blue-600">{row.id}</span> },
  { key: "name", header: "Customer", render: (row) => `${row.name} / ${row.nameDA}` },
  { key: "phone", header: "Phone", render: (row) => row.phone },
  { key: "containers", header: "Containers", render: (row) => row.containers },
  { key: "sales", header: "Sales", render: (row) => `$${row.totalSales.toLocaleString()}` },
  {
    key: "balance",
    header: "Balance",
    render: (row) => <span className="font-semibold text-green-600">${row.balance.toLocaleString()}</span>,
  },
];
