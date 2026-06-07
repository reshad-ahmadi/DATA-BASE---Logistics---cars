import { AsyncState } from "../Components/UI/AsyncState";
import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { fetchReportStats } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { ReportCards } from "./Reports/ReportCards";

const Reports = () => {
  const { data, loading, error } = useFetch(fetchReportStats, []);
  const stats = data
    ? [
        { label: "Total Revenue", value: `$${data.revenue.toLocaleString()}`, tone: "green" as const },
        { label: "Total Expenses", value: `$${data.expenses.toLocaleString()}`, tone: "red" as const },
        { label: "Net Profit", value: `$${data.netProfit.toLocaleString()}`, tone: "green" as const },
        { label: "Containers YTD", value: data.containersYtd, tone: "blue" as const },
      ]
    : [];

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader title="Reports" subtitle="گزارشات — Daily, weekly and monthly financial/logistics reports." />
      <AsyncState loading={loading} error={error}>
        <StatGrid stats={stats} />
        <ReportCards cards={data?.cards ?? []} />
      </AsyncState>
    </div>
  );
};

export default Reports;
