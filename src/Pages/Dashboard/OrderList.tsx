import { Search } from "lucide-react";
import { orderList } from "./dashboardContent";

export const OrderList = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between gap-3">
      <p className="text-sm font-bold text-slate-900">Order List</p>
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-400">
        <Search className="h-3.5 w-3.5" />
        <span className="text-xs">Search order</span>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
            {["Customer name", "Shipping ID", "Location", "Status Order"].map((head) => (
              <th key={head} className="py-2 font-semibold">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderList.map((row) => (
            <tr key={row.shippingId} className="border-b border-slate-100/80 hover:bg-slate-50/60">
              <td className="py-3 font-medium text-slate-800">{row.customer}</td>
              <td className="py-3 text-slate-500">{row.shippingId}</td>
              <td className="py-3 text-slate-600">{row.location}</td>
              <td className="py-3 text-right">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${row.status === "Complete" ? "bg-lime-50 text-lime-700" : "bg-amber-50 text-amber-700"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${row.status === "Complete" ? "bg-lime-500" : "bg-amber-500"}`} />
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
