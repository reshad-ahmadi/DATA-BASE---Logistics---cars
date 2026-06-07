type Props = {
  exchange: string;
  status: string;
  setExchange: (value: string) => void;
  setStatus: (value: string) => void;
};

const exchanges = ["All", "Jalalabad Exchange", "Herat Exchange", "Kabul Safe"];
const statuses = ["All", "completed", "pending"];

export const ExchangeFilters = ({ exchange, status, setExchange, setStatus }: Props) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    <select value={exchange} onChange={(event) => setExchange(event.target.value)} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
      {exchanges.map((item) => <option key={item}>{item}</option>)}
    </select>
    <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
      {statuses.map((item) => <option key={item}>{item}</option>)}
    </select>
  </div>
);
