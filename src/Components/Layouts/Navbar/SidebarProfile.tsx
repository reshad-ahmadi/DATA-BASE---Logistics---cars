import { UserRound } from "lucide-react";

export const SidebarProfile = () => (
  <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-5">
    <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-700">
      <UserRound className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm font-bold text-slate-900">Reshad Admin</p>
      <p className="text-[11px] font-medium text-slate-400">cargo@cargotrack.com</p>
    </div>
  </div>
);
