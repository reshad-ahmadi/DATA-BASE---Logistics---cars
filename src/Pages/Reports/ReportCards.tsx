import { reportCards } from "./reportData";

export const ReportCards = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {reportCards.map((report) => (
      <div key={report} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">{report}</p>
        <p className="mt-2 text-sm text-gray-500">Ready for backend data connection and export workflows.</p>
      </div>
    ))}
  </div>
);
