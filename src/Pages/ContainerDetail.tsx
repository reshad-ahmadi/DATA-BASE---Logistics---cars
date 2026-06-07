import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { containersListData, statusColors } from "../data/containersData";

const ContainerDetail = () => {
  const { id } = useParams();
  const container = containersListData.find((item) => item.id === id);

  if (!container) {
    return (
      <div className="mx-auto max-w-4xl py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Container not found</h2>
        <Link to="/containers" className="mt-6 inline-block text-sm text-blue-600 hover:underline">Back to Containers</Link>
      </div>
    );
  }

  const profit = container.sellingPrice - container.purchasePrice;
  const details = [
    ["Container No.", container.containerNo],
    ["BL No.", container.blNo],
    ["Route", `${container.origin} → ${container.destination}`],
    ["Customer", container.customer],
    ["Load Date", container.loadDate],
    ["Status", container.status],
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-6">
      <PageHeader title={container.id} subtitle="جزئیات کانتینر — Route, customer, status and financial summary." />
      <StatGrid stats={[
        { label: "Purchase", value: `$${container.purchasePrice.toLocaleString()}`, tone: "red" },
        { label: "Selling", value: `$${container.sellingPrice.toLocaleString()}`, tone: "blue" },
        { label: "Profit", value: `$${profit.toLocaleString()}`, tone: "green" },
      ]} />
      <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
        {details.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
            <p className="mt-1 font-semibold text-gray-900">{value}</p>
          </div>
        ))}
        <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[container.status]}`}>{container.status}</span>
      </div>
    </div>
  );
};

export default ContainerDetail;
