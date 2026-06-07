import type { Column } from "../../Components/UI/DataTable";

type SpecRow = {
  id: string; containerNo: string; blNo: string; customer: string;
  purchasePrice: number; sellingPrice: number;
};

export const specColumns: Column<SpecRow>[] = [
  { key: "id", header: "ID", render: (row) => <span className="font-semibold text-blue-600">{row.id}</span> },
  { key: "container", header: "Container", render: (row) => row.containerNo },
  { key: "bl", header: "BL No.", render: (row) => row.blNo },
  { key: "customer", header: "Customer", render: (row) => row.customer },
  { key: "purchase", header: "Purchase", render: (row) => `$${row.purchasePrice.toLocaleString()}` },
  { key: "sale", header: "Sale", render: (row) => `$${row.sellingPrice.toLocaleString()}` },
  {
    key: "profit",
    header: "Profit",
    render: (row) => <span className="font-semibold text-green-600">${(row.sellingPrice - row.purchasePrice).toLocaleString()}</span>,
  },
];
