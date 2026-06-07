import { UserRound } from "lucide-react";

export const MobileProfile = () => (
    <div className="mb-2 flex items-center gap-3 border-b border-slate-100 p-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700">
            <UserRound className="h-4 w-4" />
        </div>
        <div>
            <div className="text-xs font-bold text-slate-900">Reshad</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                Admin
            </div>
        </div>
    </div>
);
