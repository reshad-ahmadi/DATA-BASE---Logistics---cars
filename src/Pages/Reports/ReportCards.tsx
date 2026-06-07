type Props = {
  cards: string[];
};

const fallbackCards = [
  "Daily operations: transfers, costs and income",
  "Weekly balances: customers, exchanges and containers",
  "Monthly company balance: revenue, expenses and profit",
  "Logistics performance: border delays and delivery status",
];

export const ReportCards = ({ cards }: Props) => {
  const items = cards.length ? cards : fallbackCards;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((report) => (
        <div key={report} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900">{report}</p>
          <p className="mt-2 text-sm text-gray-500">Loaded from backend reports API.</p>
        </div>
      ))}
    </div>
  );
};
