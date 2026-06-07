import { MoreHorizontal } from "lucide-react";

export const RoutePanel = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <p className="text-sm font-bold text-slate-900">Route Map</p>
      <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
    <div className="grid h-[290px] place-items-center rounded-xl border border-dashed border-lime-300 bg-gradient-to-br from-lime-50 to-white text-center">
      <div>
        <p className="text-sm font-semibold text-slate-700">Map and route timeline area</p>
        <p className="text-xs text-slate-500">Connect this panel to your live map later</p>
      </div>
    </div>
  </div>
);
