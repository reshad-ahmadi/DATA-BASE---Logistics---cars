import { PageHeader } from "../Components/UI/PageHeader";
import { StatGrid } from "../Components/UI/StatGrid";
import { ReportCards } from "./Reports/ReportCards";
import { reportStats } from "./Reports/reportData";

const Reports = () => (
  <div className="mx-auto max-w-7xl space-y-6 py-2">
    <PageHeader title="Reports" subtitle="گزارشات — Daily, weekly and monthly financial/logistics reports." />
    <StatGrid stats={reportStats} />
    <ReportCards />
  </div>
);

export default Reports;
