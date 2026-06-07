import { Link } from "react-router-dom";
import { AsyncState } from "../../Components/UI/AsyncState";
import { fetchContainerRows } from "../../api/services";
import { useFetch } from "../../hooks/useFetch";

export const TransportBoard = () => {
  const { data, loading, error } = useFetch(fetchContainerRows, []);
  const rows = data ?? [];
  const inTransit = rows.filter((row) => row.status === "In Transit").length;
  const customs = rows.filter((row) => row.status === "Customs").length;
  const delivered = rows.filter((row) => ["Delivered", "Cleared", "Unloaded"].includes(row.status)).length;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Transportation Board
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Live Load Planning Dashboard
          </h1>
        </div>
        <Link to="/containers/new" className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700">
          Add Container
        </Link>
      </div>
      <AsyncState loading={loading} error={error}>
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-4">
          <p className="text-sm font-bold text-slate-900">Total {rows.length}</p>
          <p className="text-sm font-bold text-slate-900">In Transit {inTransit}</p>
          <p className="text-sm font-bold text-slate-900">Customs {customs}</p>
          <p className="text-sm font-bold text-slate-900">Delivered {delivered}</p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.slice(0, 6).map((row) => (
            <div key={row.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-bold text-slate-900">{row.containerNo}</p>
              <p className="text-xs text-slate-500">{row.origin} → {row.destination}</p>
              <p className="mt-2 text-xs font-semibold text-violet-700">{row.status}</p>
            </div>
          ))}
        </div>
      </AsyncState>
    </section>
  );
};
