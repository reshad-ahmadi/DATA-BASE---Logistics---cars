import { Minus, Plus } from "lucide-react";
import { trailerSlots } from "./dashboardContent";

export const TransportBoard = () => (
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
      <button className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700">
        Add
      </button>
    </div>
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[240px_1fr_56px]">
      <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-900">Tomas Birtner</p>
        <p className="text-xs text-slate-500">Top Driver</p>
        <div className="mt-3 space-y-1 text-sm text-slate-600">
          <p>Turbine type</p><p className="font-semibold text-slate-900">UHG</p>
          <p className="pt-2">Engine</p><p className="font-semibold text-slate-900">XC17H</p>
        </div>
      </aside>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 gap-3 border-b border-slate-200 bg-slate-50 p-4 sm:grid-cols-4">
          {["Utilization 78%", "Fuel Efficiency 8.7 mpg", "ETA 16:30", "Load Units 24"].map((item) => (
            <p key={item} className="text-sm font-bold text-slate-900">{item}</p>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
          {trailerSlots.map((slot, idx) => (
            <div key={idx} className="space-y-5 bg-white p-4">
              <div className={`h-8 w-8 rounded-md ${slot.accent}`} />
              <p className="text-[11px] uppercase tracking-wide text-slate-400">{slot.code} · {slot.kg}</p>
              <p className="text-sm font-semibold text-slate-900">{slot.utilization}% {slot.status}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {[Plus, Minus].map((Icon, idx) => <button key={idx} className="flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"><Icon className="h-4 w-4" /></button>)}
      </div>
    </div>
  </section>
);
