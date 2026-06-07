import { MoreHorizontal } from "lucide-react";
import { AsyncState } from "../../Components/UI/AsyncState";
import { containersApi } from "../../api/services";
import { useFetch } from "../../hooks/useFetch";

export const RoutePanel = () => {
  const { data, loading, error } = useFetch(() => containersApi.routes(), []);
  const routes = (data ?? []).slice(0, 6);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-slate-900">Route Map</p>
        <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <AsyncState loading={loading} error={error} empty={!routes.length} emptyMessage="No routes recorded yet.">
        <div className="space-y-3 rounded-xl border border-lime-200 bg-gradient-to-br from-lime-50 to-white p-4">
          {routes.map((route) => (
            <div key={route.id} className="rounded-lg border border-white/80 bg-white/90 px-3 py-2 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">{route.border_name}</p>
              <p className="text-xs text-slate-500">
                Container {route.container_id.slice(0, 8)} · {route.arrival_date ?? "Pending arrival"}
              </p>
              {route.remarks && <p className="mt-1 text-xs text-slate-400">{route.remarks}</p>}
            </div>
          ))}
        </div>
      </AsyncState>
    </div>
  );
};
