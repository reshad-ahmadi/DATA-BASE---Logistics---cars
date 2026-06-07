import type { Column } from "../../Components/UI/DataTable";
import type { BorderRow } from "../../api/mappers";
import { borderStatusColors } from "../../data/bordersData";

export const borderColumns: Column<BorderRow>[] = [
  { key: "id", header: "ID", render: (row) => <span className="font-semibold text-blue-600">{row.id}</span> },
  { key: "company", header: "Company", render: (row) => `${row.companyName} / ${row.companyNameDA}` },
  { key: "border", header: "Border", render: (row) => `${row.borderName} / ${row.borderNameDA}` },
  { key: "containers", header: "Containers", render: (row) => row.containersCount },
  { key: "fees", header: "Fees", render: (row) => `$${row.totalFees.toLocaleString()}` },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${borderStatusColors[row.status]}`}>
        {row.status}
      </span>
    ),
  },
  { key: "updated", header: "Updated", render: (row) => row.lastUpdate },
];
