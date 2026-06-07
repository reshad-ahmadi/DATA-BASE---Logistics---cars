import { Link } from "react-router-dom";
import { requirementModules } from "./dashboardContent";

export const ProposalCoverage = () => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-5 flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          Proposal Coverage
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
          سیستم مدیریت انتقالات کانتینر و حسابداری لوژستیکی
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          The dashboard maps directly to your logistics and accounting modules.
        </p>
      </div>
      <Link
        to="/reports"
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
      >
        View Company Balance
      </Link>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {requirementModules.map((module) => (
        <Link key={module.title} to={module.to} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <module.icon className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-100">
              Active
            </span>
          </div>
          <h2 className="text-sm font-black text-slate-900">{module.title}</h2>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">{module.titleDA}</p>
          <p className="mt-3 text-xs leading-5 text-slate-500">{module.description}</p>
        </Link>
      ))}
    </div>
  </section>
);
