import type { Column } from "../../Components/UI/DataTable";
import { statusColors } from "../../data/containersData";

type ContainerRow = {
  id: string; containerNo: string; blNo: string; origin: string;
  destination: string; status: string; loadDate: string; customer: string;
};

export const containerColumns: Column<ContainerRow>[] = [
  { key: "id", header: "ID", render: (row) => <span className="font-semibold text-blue-600">{row.id}</span> },
  { key: "container", header: "Container", render: (row) => row.containerNo },
  { key: "bl", header: "BL No.", render: (row) => row.blNo },
  { key: "route", header: "Route", render: (row) => `${row.origin} → ${row.destination}` },
  { key: "customer", header: "Customer", render: (row) => row.customer },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[row.status]}`}>
        {row.status}
      </span>
    ),
  },
  { key: "date", header: "Load Date", render: (row) => row.loadDate },
];
